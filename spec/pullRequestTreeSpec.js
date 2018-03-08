const fs = require('fs');

describe("pullRequestTree", function() {
  const githubPRs = eval(fs.readFileSync('./pullRequestTree.js', 'utf8'));

  it("should have colors", function() {
    expect(githubPRs.colors).not.toBeUndefined();
  });
});
