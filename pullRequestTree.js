(function() {
  var colors = {
    stale: { hex: '#f1c232', text: 'STALE, PULL ME THROUGH! (Open more than 5 days)' },
    shippable: { hex: '#93c47d', text: "SHIP IT! (Green, no conflicts, QA'ed, LGTM)" },
    needsAction: { hex: '#e06666', text: "NEEDS ACTION! (Doesn't have QA label, CI red, or has conflicts)" },
    blocked: { hex: '#f6d0d0', text: "Blocked" },
    WIP: { hex: '#d1c7f5', text: "WIP" },
    normal: { hex: '#cccccc', text: "None of the above" },
  }

  function PullRequest(branch) {
    this.title = branch.title
    this.pointingTo = branch.baseRefName
    this.branchName = branch.headRefName
    this.url = branch.url
    this.mergeable = branch.mergeable
    this.createdAt = branch.createdAt
    this.testStatus = branch.commits ? branch.commits.nodes[0].commit.status.state : ''
    this.labels = branch.labels ? branch.labels.nodes.map(function(label) { return label.name }) : []
    this.labelString = " (" + this.labels.join(' , ') + ")"
    this.setPRState()
    this.children = []
  }

  PullRequest.prototype.setPRState = function() {
    var context = this
    // save off label states so we only iterate through labels once
    this.labels.forEach(function(label) {
      switch (label) {
        case 'LGTM':
          context.LGTM = true; break
        case 'QA ✓':
        case 'Dev QA ✓':
          context.QAed = true; break
        case 'Requires QA':
        case 'Requires Dev QA':
          context.requiresQA = true; break
        case 'Blocked':
          context.blocked = true; break
        case 'WIP':
          context.WIP = true; break
        default:
          break
      }
    });

    this.shippable = this.mergeable && this.QAed && this.LGTM && !this.blocked && this.testStatus === 'SUCCESS'
    this.state = this.getState()
  }

  PullRequest.prototype.getState = function() {
    if (this.title === 'master') { return 'normal' }
    if (this.shippable) { return 'shippable' }
    if (this.needsAction()) { return 'needsAction' }
    if (this.blocked) { return 'blocked' }
    if (this.WIP) { return 'WIP' }
    if (this.stale()) { return 'stale' }
    return 'normal'
  }

  PullRequest.prototype.stale = function() {
    var createdAt = new Date(this.createdAt)
    var fiveDaysAgo = new Date()
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
    return createdAt < fiveDaysAgo
  }

  PullRequest.prototype.color = function() { return colors[this.state].hex }

  PullRequest.prototype.numLeaves = function() {
    var count = 0
    if (this.children.length) {
      this.children.forEach(function(child) {
        count += child.numLeaves()
      })
    } else {
      count ++
    }
    return count
  }

  PullRequest.prototype.needsAction = function() {
    // if it is in a pull-through-able state
    if (!this.WIP && !this.blocked) {
      if (!this.requiresQA && !this.QAed) {
        // needs QA label of some sort
        return true;
      }

      if (this.testStatus === 'FAILURE' || this.testStatus === 'ERROR') {
        // branch is red or messed up
        return true
      }

      if (!this.mergeable) { return true; } // has conflicts
      // (to add later): if has reviewable label but no reviewer
      // return true
    }
  }

  var dummyObj = {
    // nest things here so we can access them and spy on them in specs
    fetchBranches: function fetchBranches(options) {
      var githubUrl = 'https://api.github.com/graphql'
      var query = "query {organization(login: \"" + options.orgName + "\") {repository(name: \"" + options.repoName + "\") {milestone(number: " + options.milestoneNumber + ") {pullRequests(last: 100, states:[OPEN]) {nodes {title url labels (last: 100) {nodes {name}} createdAt baseRefName headRefName mergeable commits (last: 1) {nodes {commit {status {state}}}}}}}}}}"
      var requestOptions = {
        method: 'POST',
        payload: JSON.stringify({
          query: query
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + options.token,
        }
      };
      return JSON.parse(UrlFetchApp.fetch(githubUrl, requestOptions));
    },
  }

  function extractPullRequests(response) {
    return response.data.organization.repository.milestone.pullRequests.nodes.map(function(pull) { return new PullRequest(pull); });
  }

  function convertPRsToTree(PRs, options) {
    var master = new PullRequest({
      title: 'master',
      pointingTo: null,
      headRefName: 'master',
      url: 'github.com/' + options.orgName.toLowerCase() + '/' + options.repoName
    })
    var pullsWithMaster = PRs.slice()
    pullsWithMaster.push(master)
    PRs.forEach(function(pull) {
      findParentNode(pull, pullsWithMaster).children.push(pull)
    })
    return master
  }

  function findParentNode(target, pulls) {
    return pulls.filter(function(pull) { return pull.branchName === target.pointingTo; })[0];
  }

  return {
    _private: dummyObj,
    pullRequestTree: function(options) {
      // options = orgName, repoName, milestoneNumber, token
      var response = dummyObj.fetchBranches(options)
      var pullRequests = extractPullRequests(response)
      var tree = convertPRsToTree(pullRequests, options)
      return tree
    },
    colors: colors,
  }
})();
