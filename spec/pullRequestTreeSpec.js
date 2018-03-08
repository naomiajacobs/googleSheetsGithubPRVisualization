const fs = require('fs');
const { colors, pullRequestTree, _private } = eval(fs.readFileSync('./pullRequestTree.js', 'utf8'));
const testResponse = eval(fs.readFileSync('./spec/support/testResponse.js', 'utf8'));

describe("pullRequestTree", function() {
  it("should have colors", function() {
    expect(colors).not.toBeUndefined();
  });

  describe('pullRequestTree', () => {
    it('constructs the correct tree given a github array of PRs', () => {
      const options = {
        orgName: 'Mavenlink',
        repoName: 'mavenlink',
        milestoneNumber: 20,
        token: 'foobar123',
      };
      const spy = spyOn(_private, 'fetchBranches').and.returnValue(testResponse);
      const head = pullRequestTree(options);

      expect(head instanceof _private.PullRequest).toEqual(true)
    });
  });
});
