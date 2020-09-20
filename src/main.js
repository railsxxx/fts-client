// node_modules/watchify/bin/cmd.js src/main.js -d -o dist/bundle.js -v
// node_modules/browserify/bin/cmd.js src/main.js -s fts -o dist/bundle.js -d



const controller = require('./controller/crud.js');


// const createTable = controller.createTable;
const createTableAsync = controller.createTableAsync;

// createTable();

createTableAsync();

console.log("main.js");

// export eventhandler to browserify --standalone fts object 
const eventhandler = require('./controller/eventhandler.js');
module.exports.handleClickBusy = eventhandler.handleClickBusy;
module.exports.handleClickReady = eventhandler.handleClickReady;
// global.handleClickBusy = eventhandler.handleClickBusy;
// global.handleClickReady = eventhandler.handleClickReady;




