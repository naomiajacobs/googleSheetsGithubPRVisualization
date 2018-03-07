(function() {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // In Google Scripts, we don't have ES6 or module support

  var legendLabels = [
    { text: 'STALE, PULL ME THROUGH! (Open more than 5 days)', color: githubPRs.colors.stale },
    { text: "SHIP IT! (Green, no conflicts, QA'ed, LGTM)", color: githubPRs.colors.shippable },
    { text: "NEEDS ACTION!  (Doesn't have QA label, CI red, or has conflicts)", color: githubPRs.colors.needsAction }
  ]

  function onOpen(menuName, tabName) {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var entries = [{
      name : tabName,
      functionName : "fetchBranchesAndRender"
    }]

    this.spreadsheet.addMenu(menuName, entries)
  }

  function renderTree(tree) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    this.sheet = spreadsheet.getSheetByName('Branch Strategy');
    clearOldCells()
    renderLegend()
    displayNode(legendLabels.length + 2, 0, tree) // leave some space between legend and branches
  }

  function renderLegend() {
    var legendCells = this.sheet.getRange("B1:B" + legendLabels.length)
    legendCells.setFontColor('black');
    legendCells.setFontWeight('bold');
    legendCells.setVerticalAlignment('middle');
    legendLabels.forEach(function(label, index) {
      var cell = this.sheet.getRange("B" + (index + 1) + ":" + "B" + (index + 1));
      cell.setBackground(label.color);
      cell.setValue(label.text);
    })
  }

  function clearOldCells() {
    var range = this.sheet.getRange("A1:Z26");
    range.clear()
  }

  function displayNode(row, col, node) {
    addNodeToCell(row, col, node)
    if (node.children) {
      if(node.numLeaves() > 1) {
        var address = getCellAddress(row, col) + ':' + getCellAddress((row + node.numLeaves() - 1), col)
        this.sheet.getRange(address).mergeVertically();
      }

      // Keep track of total offset so far across children
      var offset = 0;
      node.children.forEach(function(child, index) {
        if (index > 0) {
          offset += node.children[index - 1].numLeaves() - 1
        }
        displayNode(row + index + offset, col + 1, child)
      })
    }
  }

  function addNodeToCell(row, col, node) {
    var cell = this.sheet.getRange(getCellAddress(row, col));
    cell.setFontColor('black');
    cell.setFormula("=hyperlink(\"" + node.url + "\";\"" + node.title+ "\")");
    cell.setBackground(node.color())
    cell.setVerticalAlignment("middle");
  }

  function getCellAddress(row, col) {
    return alphabet[col] + row
  }

  return {
    renderTree: renderTree,
    onOpen: onOpen
  }
})()
