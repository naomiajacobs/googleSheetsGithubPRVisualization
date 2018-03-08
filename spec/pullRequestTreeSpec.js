const fs = require('fs');
const { colors, PullRequest } = eval(fs.readFileSync('./pullRequestTree.js', 'utf8'));

describe("pullRequestTree", function() {

  it("should have colors", function() {
    expect(colors).not.toBeUndefined();
  });

  describe('PullRequest', () => {
    it('maps its options to properties properly', () => {
      const PRFromGithubAPI = {
        "title": "Rpm account color mls",
        "url": "https://github.com/mavenlink/mavenlink/pull/11713",
        "labels": {
          "nodes": [
            { "name": "Reviewable" },
            { "name": "Requires QA" }
          ]
        },
        "createdAt": "2018-03-08T00:45:21Z",
        "baseRefName": "rpm_default_color_rules",
        "headRefName": "rpm_account_color_mls",
        "mergeable": "MERGEABLE",
        "commits": {
          "nodes": [
            {
              "commit": {
                "status": {
                  "state": "SUCCESS"
                }
              }
            }
          ]
        }
      };

      const pull = new PullRequest(PRFromGithubAPI);

      expect(pull.testStatus).toEqual('SUCCESS');
      expect(pull.labels).toEqual(['Reviewable', 'Requires QA']);
    });
  });
});
