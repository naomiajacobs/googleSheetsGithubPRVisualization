const fs = require('fs');
const { colors, pullRequestTree, _private } = eval(fs.readFileSync('./pullRequestTree.js', 'utf8'));
const goodTestResponse = eval(fs.readFileSync('./spec/support/goodTestResponse.js', 'utf8'));
const badTestResponse = eval(fs.readFileSync('./spec/support/badTestResponse.js', 'utf8'));

describe("pullRequestTree", function() {
  it("should have colors", function() {
    expect(colors).not.toBeUndefined();
  });

  describe('pullRequestTree', () => {
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

    it('constructs the correct tree given a github array of PRs', () => {
      const options = {
        orgName: 'Mavenlink',
        repoName: 'mavenlink',
        milestoneNumber: 20,
        token: 'foobar123',
      };
      const spy = spyOn(_private, 'fetchBranches').and.returnValue(goodTestResponse);
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

  describe("when a child's parent is not on the milestone", () => {
    it('skips the child when building the tree and does not blow up', () => {
      const options = {
        orgName: 'Mavenlink',
        repoName: 'mavenlink',
        milestoneNumber: 20,
        token: 'foobar123',
      };
      const spy = spyOn(_private, 'fetchBranches').and.returnValue(badTestResponse);
      const head = pullRequestTree(options);

      expect(head.children.length).toEqual(1);
    });
  });
});
