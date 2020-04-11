const json = require('../model/json.js')
const model = require('../model/matrix.js');
const table = require('../view/tableView.js');

let fetchJson = json.fetchJson;
let matrix = model.matrix;
let tableView = table.tableView;


function createTable() {
  let data = fetchJson();
  console.log("createTable");
  console.log(data);
  let tableData = matrix(data);
  let tableHtml = tableView(tableData);
  // console.log("tableHtml: " + tableHtml);
  document.getElementById("app").innerHTML = tableHtml;
}

// exports #################################
module.exports.createTable = createTable;