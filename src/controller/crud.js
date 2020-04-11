const json = require('../model/json.js')
const model = require('../model/matrix.js');
const table = require('../view/tableView.js');

// let fetchJson = json.fetchJson;
let fetchJsonAsync = json.fetchJsonAsync;
let matrix = model.matrix;
let tableView = table.tableView;

async function createTableAsync() {
  // console.log("createTableAsync");
  let data = await fetchJsonAsync();
  // console.log(data);
  createTableView(data);
}

// function createTable() {
//   // console.log("createTable");
//   let data = fetchJson();
//   // console.log(data);
//   createTableView(data);
// }

function createTableView(data) {
  let tableData = matrix(data);
  let tableHtml = tableView(tableData);
  // console.log("tableHtml: " + tableHtml);
  document.getElementById("app").innerHTML = tableHtml;
}

// exports #################################
// module.exports.createTable = createTable; 
module.exports.createTableAsync = createTableAsync;