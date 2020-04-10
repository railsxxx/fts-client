// node_modules/watchify/bin/cmd.js src/main.js -d -o dist/bundle.js -v
// node_modules/browserify/bin/cmd.js src/main.js -o dist/bundle.js -d

const model = require('./model/matrix.js');
const table = require('./view/tableView.js');

let matrix = model.matrix;
let tableView = table.tableView;

let html = tableView(matrix);
// console.log("html: " + html);
document.getElementById("app").innerHTML = html;

console.log("main.js");

