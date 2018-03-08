const fs = require('fs');
const { colors, pullRequestTree, _private } = eval(fs.readFileSync('./pullRequestTree.js', 'utf8'));
const testResponse = eval(fs.readFileSync('./spec/support/testResponse.js', 'utf8'));

/*
master
+
+--->first-child
|
+--->second-child+-------->first-grandchild
|                |
|                +-------->second-grandchild
|                |
|                +-------->third-grandchild
|
+--->third-child+--------->fourth-grandchild
*/

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

      expect(head.children.length).toEqual(3);

      const expectedChildren = ['oldest-child', 'middle-child', 'youngest-child']
      expect(head.children.map(pr => pr.branchName)).toEqual(expectedChildren);
      expect(head.children[0].children.length).toEqual(0);

      const expectedSecondChildChildren = [
        'first-grandchild',
        'second-grandchild',
        'third-grandchild',
      ];
      expect(head.children[1].children.map(pr => pr.branchName)).toEqual(expectedSecondChildChildren);

      const expectedThirdChildChildren = ['fourth-grandchild'];
      expect(head.children[2].children.map(pr => pr.branchName)).toEqual(expectedThirdChildChildren);
    });
  });
});
