const tableTemplate = require('./tableTemplate')

const renderTable = tableTemplate.renderTable;

function tableView(matrix) {

  // console.log("tableView.js");
  // console.log(matrix);
  let colCount = matrix.length;
  let rowCount = matrix[0].length;
  // console.log("colCount: " + colCount + ", rowCount: " + rowCount)
  let rows = [];
  let cells = [];
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      if (matrix[c][r])
        cells.push(matrix[c][r]);
      else cells.push("null");
    }
    setBlink(cells);
    rows.push(cells);
    cells = [];
  }
  // console.log(rows);
  let rendered = renderTable(rows);
  // console.log("rendered: " + rendered);
  return rendered;
}

function setBlink(cells) {
  for (let c = 1; c < cells.length; c++) {
    if (cells[0] == "null" && cells[c] != "null" && (cells[c]).type == "Carrier" && (cells[c]).orderNumber) {
      cells[c].blink = true;
    }
  }
}

// exports ##################################
module.exports.tableView = tableView;