// node_modules/watchify/bin/cmd.js src/main.js -d -o dist/bundle.js -v
// node_modules/browserify/bin/cmd.js src/main.js -o dist/bundle.js -d

// // init global namespace
// window.ftsclient = {};
// window.ftsclient.step = 0;


const controller = require('./controller/crud.js')

// const createTable = controller.createTable;
const createTableAsync = controller.createTableAsync;

// createTable();

createTableAsync();

console.log("main.js");

