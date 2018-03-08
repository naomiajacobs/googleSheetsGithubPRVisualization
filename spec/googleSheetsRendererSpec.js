const fs = require('fs');

xdescribe("googleSheetsRenderer", function() {
  // const renderer = eval(fs.readFileSync('./googleSheetsRenderer.js', 'utf8'));

  beforeEach(function() {
  });

  it("should have the method", function() {
    expect(renderer.renderTree).toBePresent();
  });
});
