Google Sheets Github Pull Request Visualization

![Visualization Screenshot](screenshots/visualization.png?raw=true)

This repo contains the code and instructions to add a visualization of your team's branch strategy to a tab in a Google Sheet.

To use this code:
1. Make a Google Sheet
2. Pick a target tab in the sheet that you want the visualization to appear on.
3. Navigate to Tools > Script Editor to open the Google App Scripts editor.
4. Copy the code snippet below and paste it into your script. Fill in the variables with your information.
5. Add a project trigger that runs `onOpen` whenever a user opens the spreadsheet.
![Trigger Screenshot](screenshots/triggers.png?raw=true)
6. Save the script and refresh your google sheet. You should see a new menu item with the 'Update Branches' option. Click that, and you should see your visualization populate the target tab.

```
var prFetcherURL = "https://raw.githubusercontent.com/naomiajacobs/googleSheetsGithubPRVisualization/master/pullRequestTree.js"
var rendererURL = "https://raw.githubusercontent.com/naomiajacobs/googleSheetsGithubPRVisualization/master/googleSheetsRenderer.js"
var githubPRs = eval(UrlFetchApp.fetch(prFetcherURL).getContentText())
var renderer = eval(UrlFetchApp.fetch(rendererURL).getContentText())

var tabName = YOUR_TAB_NAME

function onOpen() {
  renderer.onOpen(DESIRED_MENU_NAME, tabName)
}

function fetchBranchesAndRender() {
  var options = {
    orgName: YOUR_GITHUB_ORGANIZATION_NAME,
    repoName: YOUR_REPO_NAME,
    milestoneNumber: YOUR_MILESTONE_NAME,
    token: YOUR_GITHUB_TOKEN
  }
  var tree = githubPRs.pullRequestTree(options)
  renderer.renderTree(tree, tabName)
}
```
