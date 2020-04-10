const tableTemplate = require('./tableTemplate')

let renderTable = tableTemplate.renderTable;

function tableView(matrix) {

  // console.log("tableView.js");
  // console.log(matrix);
  let colCount = matrix.length;
  let rowCount = matrix[0].length;
  // console.log("colCount: " + colCount + ", rowCount: " + rowCount)
  let rows = [];
  let cells = [];
  for (r = 0; r < rowCount; r++) {
    for (c = 0; c < colCount; c++) {
      if (matrix[c][r])
        cells.push(matrix[c][r]).name;
      else cells.push("null");
    }
    // html += "<br>";
    rows.push(cells);
    cells = [];
  }
  // console.log(rows);
  let rendered = renderTable(rows);
  // console.log("rendered: " + rendered);
  return rendered;
}

// exports ##################################
module.exports.tableView = tableView;