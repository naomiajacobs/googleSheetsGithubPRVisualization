(function() {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // In Google Scripts, we don't have ES6 or module support

  // var legendLabels = [
  //   { text: 'STALE, PULL ME THROUGH! (Open more than 5 days)', color: githubPRs.colors.stale },
  //   { text: "SHIP IT! (Green, no conflicts, QA'ed, LGTM)", color: githubPRs.colors.shippable },
  //   { text: "NEEDS ACTION!  (Doesn't have QA label, CI red, or has conflicts)", color: githubPRs.colors.needsAction },
  //   { text: "Blocked", color: githubPRs.colors.blocked },
  //   { text: "WIP", color: githubPRs.colors.WIP }
  // ]

  var legendLabels = Object.keys(githubPRs.colors).map(function(colorKey) { return githubPRs.colors[colorKey] })

  function renderTree(tree, tabName) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = spreadsheet.getSheetByName(tabName);
    clearOldCells(sheet)
    renderLegend(sheet)
    displayNode(sheet, legendLabels.length + 2, 0, tree) // leave some space between legend and branches
  }

  function renderLegend(sheet) {
    var legendCells = sheet.getRange("B1:B" + legendLabels.length)
    legendCells.setFontColor('black');
    legendCells.setFontWeight('bold');
    legendCells.setVerticalAlignment('middle');
    legendLabels.forEach(function(label, index) {
      var cell = sheet.getRange("B" + (index + 1) + ":" + "B" + (index + 1));
      cell.setBackground(label.hex);
      cell.setValue(label.text);
    })
  }

  function clearOldCells(sheet) {
    var range = sheet.getRange("A1:Z26");
    range.clear()
  }

  function displayNode(sheet, row, col, node) {
    addNodeToCell(sheet, row, col, node)
    if (node.children) {
      if(node.numLeaves() > 1) {
        var address = getCellAddress(row, col) + ':' + getCellAddress((row + node.numLeaves() - 1), col)
        sheet.getRange(address).mergeVertically();
      }

      // Keep track of total offset so far across children
      var offset = 0;
      node.children.forEach(function(child, index) {
        if (index > 0) {
          offset += node.children[index - 1].numLeaves() - 1
        }
        displayNode(sheet, row + index + offset, col + 1, child)
      })
    }
  }

  function addNodeToCell(sheet, row, col, node) {
    var cell = sheet.getRange(getCellAddress(row, col));
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
  }
})()
