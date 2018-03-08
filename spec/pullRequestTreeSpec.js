const fs = require('fs');

describe("pullRequestTreeSpec", function() {
  const githubPRs = eval(fs.readFileSync('./pullRequestTree.js', 'utf8'));

  beforeEach(function() {
  });

  it("should have the method", function() {
    expect(githubPRs.colors).not.toBeUndefined();
  });
});
