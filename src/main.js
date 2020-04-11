// node_modules/watchify/bin/cmd.js src/main.js -d -o dist/bundle.js -v
// node_modules/browserify/bin/cmd.js src/main.js -o dist/bundle.js -d

const controller = require('./controller/crud.js')

const createTable = controller.createTable;

createTable();

console.log("main.js");

