(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"../model/json.js":3,"../model/matrix.js":4,"../view/tableView.js":7}],2:[function(require,module,exports){
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


},{"./controller/crud.js":1}],3:[function(require,module,exports){

/*
let init = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';

let werker = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":true,"Service":"Pfeife_Material"},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":"218915A7-5769-4F52-96F5-5D0725D0A70F","Product":"Pfeife_Gravur","CurrentStationID":1,"DestinationStationID":1,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';

module.exports.fetchJson = function () {
  // console.log(werker);
  return JSON.parse(werker);
}
*/

module.exports.fetchJsonAsync =
  async function () {
    let url = './json/werker.json';
    // console.log('fetchJsonAsync');
    // console.log("url: " + url);
    const res = await fetch(url);
    // console.log(res);
    let json = await res.json();
    // console.log(json);
    return json;
  };



},{}],4:[function(require,module,exports){
const wrappers = require('./wrappers.js');

let Resource = wrappers.Resource;
let Transport = wrappers.Transport;
let Carrier = wrappers.Carrier;
let Station = wrappers.Station;

function matrix(data) {

  // console.log("matrix.js");
  // console.log(data);

  let transCount = data.Transports.length;
  let resCount = data.Resources.length;

  // Create array columns
  let colCount = transCount + 1;
  var arr = new Array(colCount);
  let c = 0; // columns
  let r = 0; // rows

  // Add empty row array for each column
  let rowCount = 0;
  for (c = 0; c < colCount; c++) {
    arr[c] = [];
  }

  // add row of column header
  rowCount = 1;
  arr[0][0] = null;
  for (c = 1; c < colCount; c++) {
    // arr[c][0] = data.Transports[c - 1];
    arr[c][0] = new Transport(data.Transports[c - 1]);
  }

  // Add a row for each resource
  rowCount += resCount;
  let res, resTrans;
  for (r = 1; r < rowCount; r++) {
    res = data.Resources[r - 1];
    // add resource in first column
    arr[0][r] = new Resource(res);
    // Add stationID if any per transport column
    for (c = 1; c < colCount; c++) {
      resTrans = res.ResTransports;
      for (let t = 0; t < resTrans.length; t++) {
        // console.log("r: " + r + ", c: " + c + ", arr[c][0].transportID: " + arr[c][0].transportID + ", resTrans[t].TransportID: " + resTrans[t].TransportID);
        if (arr[c][0].id == resTrans[t].TransportID) {
          arr[c][r] = new Station(resTrans[t]);
          break;
        } else {
          arr[c][r] = null;
        }
      }
    }
  }

  // Add a row for each transport carrier
  let maxCarrierCount = 0;
  for (let t = 0; t < transCount; t++) {
    if (maxCarrierCount < data.Transports[t].Carriers.length) maxCarrierCount = data.Transports[t].Carriers.length
  }
  let rowAfterResources = rowCount;
  rowCount += maxCarrierCount;
  let transCars, t = 0;
  for (r = rowAfterResources; r < rowCount; r++) {
    arr[0][r] = null;
    for (c = 1; c < colCount; c++) {
      transCars = arr[c][0].carriers;
      arr[c][r] = (new Carrier(transCars[t]).setHome(c, r));
    }
    t++;
  }

  // Move carrier to resource station
  let m = 0;
  for (r = rowAfterResources; r < rowCount; r++) {
    for (c = 1; c < colCount; c++) {
      // transCars = arr[c][0].carriers;
      transCars = arr[c][r];
      if (transCars.currentStationID != 0) {
        // clear carrier home cell
        arr[c][r] = null;
        // get row of current resource station
        for (m = 1; m < rowCount; m++) {
          if (arr[c][m].id == transCars.currentStationID) break;
        }
        // move carrier to row of resource
        arr[c][m] = transCars;
      }
    }
  }

  // Loop to display the elements of 2D array. 
  let output = "";
  for (r = 0; r < rowCount; r++) {
    for (c = 0; c < colCount; c++) {
      if (arr[c][r])
        output += (arr[c][r]).name + " ";
      else output += "null ";
    }
    output += "\n";
  }
  // console.log(output);
  // console.log(arr);
  return arr;
}

// exports ####################################
module.exports.matrix = matrix;

},{"./wrappers.js":5}],5:[function(require,module,exports){
const wrapperTemplate = require('../view/wrapperTemplate');

let renderResource = wrapperTemplate.renderResource;
let renderTransport = wrapperTemplate.renderTransport;
let renderCarrier = wrapperTemplate.renderCarrier;
let renderStation = wrapperTemplate.renderStation;

class Resource {
  constructor(_resource) {
    this.resource = _resource;
  }

  get id() { return this.resource.ResourceID; }
  get name() { return this.resource.Name; }
  get ready() { return this.resource.Ready; }
  get busy() { return this.resource.Busy; }
  get service() { return this.resource.Service; }

  render() {
    return renderResource(this);
  }
}

class Transport {
  constructor(_transport) {
    this.transport = _transport;
  }

  get id() { return this.transport.TransportID; }
  get name() { return this.transport.Name; }
  get carriers() { return this.transport.Carriers; }

  render() {
    return renderTransport(this);
  }
}

class Carrier {
  constructor(_carrier) {
    this.carrier = _carrier;
    this.home = { col: 0, row: 0 };
  }

  get id() { return this.carrier.CarrierID; }
  get name() { return "car_" + this.id; }
  get orderNumber() { return this.carrier.OrderNumber; }
  get product() { return this.carrier.Product; }
  get currentStationID() { return this.carrier.CurrentStationID; }
  get destinationStationID() { return this.carrier.DestinationStationID; }
  get moving() { return this.carrier.moving; }

  render() {
    return renderCarrier(this);
  }

  setHome(c, r) {
    this.home.col = c;
    this.home.row = r;
    return this;
  }
}

class Station {
  constructor(_station) {
    this.station = _station;
  }

  get id() { return this.station.StationID; }
  get name() { return "stat_" + this.id; }
  get transportID() { return this.station.TransportID; }
  get transportName() { return this.station.Name; }

  render() {
    return renderStation(this);
  }
}

// exports #######################################

module.exports.Resource = Resource;
module.exports.Transport = Transport;
module.exports.Carrier = Carrier;
module.exports.Station = Station;
},{"../view/wrapperTemplate":8}],6:[function(require,module,exports){
//https://wesbos.com/template-strings-html/

function renderHeader(rows){
  let header = ["Resource"];
  for (let c = 1; c < rows[0].length; c++) {
    header.push("Transport");
  }
  return header.map(head => `
  <th>
    ${head}
  </th>
  `).join('');
}

function renderRow(cells) {
  return cells.map(cell => `
  <td>
    ${cell != "null" ? `${cell.render()}` : ''}
  </td>
  `).join('');
}

function renderTable(rows) {
  return `
	<table style="width:100%">
    <tr>
      ${renderHeader(rows)}
    </tr>
    ${rows.map(row => `
    <tr>
      ${renderRow(row)}
    </tr>
    `).join('')}
	</table>
  `;
}

// exorts #########################
module.exports.renderTable = renderTable;
},{}],7:[function(require,module,exports){
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
},{"./tableTemplate":6}],8:[function(require,module,exports){

function renderResource(resource) {
  return `
  <table id="res">
    <tr>
      <td id="resName">Name</td>
      <td id="resCost">Cost</td>
      <td id="resTime">Time</td>
      <td id="resReady">R</td>
      <td id="resBusy">B</td>
      <td id="resService">Service</td>
    </tr>
    <tr id="value">
      <td>${resource.name}</td>
      <td>1</td>
      <td>1</td>
      <td>
        <input type="checkbox" checked>
      </td>
      <td>
        <input type="checkbox" checked>
      </td>
      <td>${resource.service ? resource.service : ""}</td>
    </tr>
  </table>
  `;
}

function renderTransport(transport) {
  return transport.name;
}

function renderCarrier(carrier) {
  return `
  <table>
    <tr>
      <td>Nr</td>
      <td>Product</td>
      <td>Cost</td>
      <td>Time</td>
      <td>CID</td>
    </tr>
    <tr id="value">
      <td>${carrier.orderNumber ? carrier.orderNumber.substr(0, 4) + "..." : ""}</td>
      <td>${carrier.product ? carrier.product : ""}</td>
      <td>0</td>
      <td>0</td>
      <td>${carrier.id}</td>
    </tr>
  </table>
  `;
}

function renderStation(station) {
  return `
  <table id="transStation">
    <tr>
      <td>
        ${station.id}
      </td>
    </tr>
  </table>
  `;
}

// exports ######################################
module.exports.renderResource = renderResource; module.exports.renderTransport = renderTransport; module.exports.renderCarrier = renderCarrier; module.exports.renderStation = renderStation;
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udHJvbGxlci9jcnVkLmpzIiwic3JjL21haW4uanMiLCJzcmMvbW9kZWwvanNvbi5qcyIsInNyYy9tb2RlbC9tYXRyaXguanMiLCJzcmMvbW9kZWwvd3JhcHBlcnMuanMiLCJzcmMvdmlldy90YWJsZVRlbXBsYXRlLmpzIiwic3JjL3ZpZXcvdGFibGVWaWV3LmpzIiwic3JjL3ZpZXcvd3JhcHBlclRlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QganNvbiA9IHJlcXVpcmUoJy4uL21vZGVsL2pzb24uanMnKVxuY29uc3QgbW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbC9tYXRyaXguanMnKTtcbmNvbnN0IHRhYmxlID0gcmVxdWlyZSgnLi4vdmlldy90YWJsZVZpZXcuanMnKTtcblxuLy8gbGV0IGZldGNoSnNvbiA9IGpzb24uZmV0Y2hKc29uO1xubGV0IGZldGNoSnNvbkFzeW5jID0ganNvbi5mZXRjaEpzb25Bc3luYztcbmxldCBtYXRyaXggPSBtb2RlbC5tYXRyaXg7XG5sZXQgdGFibGVWaWV3ID0gdGFibGUudGFibGVWaWV3O1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVUYWJsZUFzeW5jKCkge1xuICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZVRhYmxlQXN5bmNcIik7XG4gIGxldCBkYXRhID0gYXdhaXQgZmV0Y2hKc29uQXN5bmMoKTtcbiAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gIGNyZWF0ZVRhYmxlVmlldyhkYXRhKTtcbn1cblxuLy8gZnVuY3Rpb24gY3JlYXRlVGFibGUoKSB7XG4vLyAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlVGFibGVcIik7XG4vLyAgIGxldCBkYXRhID0gZmV0Y2hKc29uKCk7XG4vLyAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICBjcmVhdGVUYWJsZVZpZXcoZGF0YSk7XG4vLyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlVmlldyhkYXRhKSB7XG4gIGxldCB0YWJsZURhdGEgPSBtYXRyaXgoZGF0YSk7XG4gIGxldCB0YWJsZUh0bWwgPSB0YWJsZVZpZXcodGFibGVEYXRhKTtcbiAgLy8gY29uc29sZS5sb2coXCJ0YWJsZUh0bWw6IFwiICsgdGFibGVIdG1sKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikuaW5uZXJIVE1MID0gdGFibGVIdG1sO1xufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gbW9kdWxlLmV4cG9ydHMuY3JlYXRlVGFibGUgPSBjcmVhdGVUYWJsZTsgXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVUYWJsZUFzeW5jID0gY3JlYXRlVGFibGVBc3luYzsiLCIvLyBub2RlX21vZHVsZXMvd2F0Y2hpZnkvYmluL2NtZC5qcyBzcmMvbWFpbi5qcyAtZCAtbyBkaXN0L2J1bmRsZS5qcyAtdlxuLy8gbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvYmluL2NtZC5qcyBzcmMvbWFpbi5qcyAtbyBkaXN0L2J1bmRsZS5qcyAtZFxuXG4vLyAvLyBpbml0IGdsb2JhbCBuYW1lc3BhY2Vcbi8vIHdpbmRvdy5mdHNjbGllbnQgPSB7fTtcbi8vIHdpbmRvdy5mdHNjbGllbnQuc3RlcCA9IDA7XG5cblxuY29uc3QgY29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9jcnVkLmpzJylcblxuLy8gY29uc3QgY3JlYXRlVGFibGUgPSBjb250cm9sbGVyLmNyZWF0ZVRhYmxlO1xuY29uc3QgY3JlYXRlVGFibGVBc3luYyA9IGNvbnRyb2xsZXIuY3JlYXRlVGFibGVBc3luYztcblxuLy8gY3JlYXRlVGFibGUoKTtcblxuY3JlYXRlVGFibGVBc3luYygpO1xuXG5jb25zb2xlLmxvZyhcIm1haW4uanNcIik7XG5cbiIsIlxuLypcbmxldCBpbml0ID0gJ3tcIlJlc291cmNlc1wiOlt7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjoxfSx7XCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIixcIlN0YXRpb25JRFwiOjF9XSxcIlJlc291cmNlSURcIjoxLFwiTmFtZVwiOlwiV2Vya2VyMVwiLFwiUmVhZHlcIjp0cnVlLFwiQnVzeVwiOmZhbHNlLFwiU2VydmljZVwiOm51bGx9LHtcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjoyLFwiTmFtZVwiOlwiTcO8Z2FcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjpmYWxzZSxcIlNlcnZpY2VcIjpudWxsfSx7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjozfV0sXCJSZXNvdXJjZUlEXCI6MyxcIk5hbWVcIjpcIkxhc2VyXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH0se1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjo0LFwiTmFtZVwiOlwiSGVybWxlXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH1dLFwiVHJhbnNwb3J0c1wiOlt7XCJDYXJyaWVyc1wiOlt7XCJDYXJyaWVySURcIjo0LFwiT3JkZXJOdW1iZXJcIjpudWxsLFwiUHJvZHVjdFwiOm51bGwsXCJDdXJyZW50U3RhdGlvbklEXCI6MCxcIkRlc3RpbmF0aW9uU3RhdGlvbklEXCI6MCxcIm1vdmluZ1wiOmZhbHNlfV0sXCJUcmFuc3BvcnRJRFwiOjEsXCJOYW1lXCI6XCJTdGVpblRyYW5zZmVyYmFuZFwifSx7XCJDYXJyaWVyc1wiOlt7XCJDYXJyaWVySURcIjoxLFwiT3JkZXJOdW1iZXJcIjpudWxsLFwiUHJvZHVjdFwiOm51bGwsXCJDdXJyZW50U3RhdGlvbklEXCI6MCxcIkRlc3RpbmF0aW9uU3RhdGlvbklEXCI6MCxcIm1vdmluZ1wiOmZhbHNlfV0sXCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIn1dfSc7XG5cbmxldCB3ZXJrZXIgPSAne1wiUmVzb3VyY2VzXCI6W3tcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjF9LHtcIlRyYW5zcG9ydElEXCI6MixcIk5hbWVcIjpcIkZUU1wiLFwiU3RhdGlvbklEXCI6MX1dLFwiUmVzb3VyY2VJRFwiOjEsXCJOYW1lXCI6XCJXZXJrZXIxXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6dHJ1ZSxcIlNlcnZpY2VcIjpcIlBmZWlmZV9NYXRlcmlhbFwifSx7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjoyfV0sXCJSZXNvdXJjZUlEXCI6MixcIk5hbWVcIjpcIk3DvGdhXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH0se1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjEsXCJOYW1lXCI6XCJTdGVpblRyYW5zZmVyYmFuZFwiLFwiU3RhdGlvbklEXCI6M31dLFwiUmVzb3VyY2VJRFwiOjMsXCJOYW1lXCI6XCJMYXNlclwiLFwiUmVhZHlcIjp0cnVlLFwiQnVzeVwiOmZhbHNlLFwiU2VydmljZVwiOm51bGx9LHtcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoyLFwiTmFtZVwiOlwiRlRTXCIsXCJTdGF0aW9uSURcIjoyfV0sXCJSZXNvdXJjZUlEXCI6NCxcIk5hbWVcIjpcIkhlcm1sZVwiLFwiUmVhZHlcIjp0cnVlLFwiQnVzeVwiOmZhbHNlLFwiU2VydmljZVwiOm51bGx9XSxcIlRyYW5zcG9ydHNcIjpbe1wiQ2FycmllcnNcIjpbe1wiQ2FycmllcklEXCI6NCxcIk9yZGVyTnVtYmVyXCI6XCIyMTg5MTVBNy01NzY5LTRGNTItOTZGNS01RDA3MjVEMEE3MEZcIixcIlByb2R1Y3RcIjpcIlBmZWlmZV9HcmF2dXJcIixcIkN1cnJlbnRTdGF0aW9uSURcIjoxLFwiRGVzdGluYXRpb25TdGF0aW9uSURcIjoxLFwibW92aW5nXCI6ZmFsc2V9XSxcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCJ9LHtcIkNhcnJpZXJzXCI6W3tcIkNhcnJpZXJJRFwiOjEsXCJPcmRlck51bWJlclwiOm51bGwsXCJQcm9kdWN0XCI6bnVsbCxcIkN1cnJlbnRTdGF0aW9uSURcIjowLFwiRGVzdGluYXRpb25TdGF0aW9uSURcIjowLFwibW92aW5nXCI6ZmFsc2V9XSxcIlRyYW5zcG9ydElEXCI6MixcIk5hbWVcIjpcIkZUU1wifV19JztcblxubW9kdWxlLmV4cG9ydHMuZmV0Y2hKc29uID0gZnVuY3Rpb24gKCkge1xuICAvLyBjb25zb2xlLmxvZyh3ZXJrZXIpO1xuICByZXR1cm4gSlNPTi5wYXJzZSh3ZXJrZXIpO1xufVxuKi9cblxubW9kdWxlLmV4cG9ydHMuZmV0Y2hKc29uQXN5bmMgPVxuICBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHVybCA9ICcuL2pzb24vd2Vya2VyLmpzb24nO1xuICAgIC8vIGNvbnNvbGUubG9nKCdmZXRjaEpzb25Bc3luYycpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidXJsOiBcIiArIHVybCk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgIGxldCBqc29uID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAvLyBjb25zb2xlLmxvZyhqc29uKTtcbiAgICByZXR1cm4ganNvbjtcbiAgfTtcblxuXG4iLCJjb25zdCB3cmFwcGVycyA9IHJlcXVpcmUoJy4vd3JhcHBlcnMuanMnKTtcblxubGV0IFJlc291cmNlID0gd3JhcHBlcnMuUmVzb3VyY2U7XG5sZXQgVHJhbnNwb3J0ID0gd3JhcHBlcnMuVHJhbnNwb3J0O1xubGV0IENhcnJpZXIgPSB3cmFwcGVycy5DYXJyaWVyO1xubGV0IFN0YXRpb24gPSB3cmFwcGVycy5TdGF0aW9uO1xuXG5mdW5jdGlvbiBtYXRyaXgoZGF0YSkge1xuXG4gIC8vIGNvbnNvbGUubG9nKFwibWF0cml4LmpzXCIpO1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcblxuICBsZXQgdHJhbnNDb3VudCA9IGRhdGEuVHJhbnNwb3J0cy5sZW5ndGg7XG4gIGxldCByZXNDb3VudCA9IGRhdGEuUmVzb3VyY2VzLmxlbmd0aDtcblxuICAvLyBDcmVhdGUgYXJyYXkgY29sdW1uc1xuICBsZXQgY29sQ291bnQgPSB0cmFuc0NvdW50ICsgMTtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShjb2xDb3VudCk7XG4gIGxldCBjID0gMDsgLy8gY29sdW1uc1xuICBsZXQgciA9IDA7IC8vIHJvd3NcblxuICAvLyBBZGQgZW1wdHkgcm93IGFycmF5IGZvciBlYWNoIGNvbHVtblxuICBsZXQgcm93Q291bnQgPSAwO1xuICBmb3IgKGMgPSAwOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgIGFycltjXSA9IFtdO1xuICB9XG5cbiAgLy8gYWRkIHJvdyBvZiBjb2x1bW4gaGVhZGVyXG4gIHJvd0NvdW50ID0gMTtcbiAgYXJyWzBdWzBdID0gbnVsbDtcbiAgZm9yIChjID0gMTsgYyA8IGNvbENvdW50OyBjKyspIHtcbiAgICAvLyBhcnJbY11bMF0gPSBkYXRhLlRyYW5zcG9ydHNbYyAtIDFdO1xuICAgIGFycltjXVswXSA9IG5ldyBUcmFuc3BvcnQoZGF0YS5UcmFuc3BvcnRzW2MgLSAxXSk7XG4gIH1cblxuICAvLyBBZGQgYSByb3cgZm9yIGVhY2ggcmVzb3VyY2VcbiAgcm93Q291bnQgKz0gcmVzQ291bnQ7XG4gIGxldCByZXMsIHJlc1RyYW5zO1xuICBmb3IgKHIgPSAxOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgIHJlcyA9IGRhdGEuUmVzb3VyY2VzW3IgLSAxXTtcbiAgICAvLyBhZGQgcmVzb3VyY2UgaW4gZmlyc3QgY29sdW1uXG4gICAgYXJyWzBdW3JdID0gbmV3IFJlc291cmNlKHJlcyk7XG4gICAgLy8gQWRkIHN0YXRpb25JRCBpZiBhbnkgcGVyIHRyYW5zcG9ydCBjb2x1bW5cbiAgICBmb3IgKGMgPSAxOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgICAgcmVzVHJhbnMgPSByZXMuUmVzVHJhbnNwb3J0cztcbiAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgcmVzVHJhbnMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyOiBcIiArIHIgKyBcIiwgYzogXCIgKyBjICsgXCIsIGFycltjXVswXS50cmFuc3BvcnRJRDogXCIgKyBhcnJbY11bMF0udHJhbnNwb3J0SUQgKyBcIiwgcmVzVHJhbnNbdF0uVHJhbnNwb3J0SUQ6IFwiICsgcmVzVHJhbnNbdF0uVHJhbnNwb3J0SUQpO1xuICAgICAgICBpZiAoYXJyW2NdWzBdLmlkID09IHJlc1RyYW5zW3RdLlRyYW5zcG9ydElEKSB7XG4gICAgICAgICAgYXJyW2NdW3JdID0gbmV3IFN0YXRpb24ocmVzVHJhbnNbdF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycltjXVtyXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYSByb3cgZm9yIGVhY2ggdHJhbnNwb3J0IGNhcnJpZXJcbiAgbGV0IG1heENhcnJpZXJDb3VudCA9IDA7XG4gIGZvciAobGV0IHQgPSAwOyB0IDwgdHJhbnNDb3VudDsgdCsrKSB7XG4gICAgaWYgKG1heENhcnJpZXJDb3VudCA8IGRhdGEuVHJhbnNwb3J0c1t0XS5DYXJyaWVycy5sZW5ndGgpIG1heENhcnJpZXJDb3VudCA9IGRhdGEuVHJhbnNwb3J0c1t0XS5DYXJyaWVycy5sZW5ndGhcbiAgfVxuICBsZXQgcm93QWZ0ZXJSZXNvdXJjZXMgPSByb3dDb3VudDtcbiAgcm93Q291bnQgKz0gbWF4Q2FycmllckNvdW50O1xuICBsZXQgdHJhbnNDYXJzLCB0ID0gMDtcbiAgZm9yIChyID0gcm93QWZ0ZXJSZXNvdXJjZXM7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgYXJyWzBdW3JdID0gbnVsbDtcbiAgICBmb3IgKGMgPSAxOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgICAgdHJhbnNDYXJzID0gYXJyW2NdWzBdLmNhcnJpZXJzO1xuICAgICAgYXJyW2NdW3JdID0gKG5ldyBDYXJyaWVyKHRyYW5zQ2Fyc1t0XSkuc2V0SG9tZShjLCByKSk7XG4gICAgfVxuICAgIHQrKztcbiAgfVxuXG4gIC8vIE1vdmUgY2FycmllciB0byByZXNvdXJjZSBzdGF0aW9uXG4gIGxldCBtID0gMDtcbiAgZm9yIChyID0gcm93QWZ0ZXJSZXNvdXJjZXM7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgZm9yIChjID0gMTsgYyA8IGNvbENvdW50OyBjKyspIHtcbiAgICAgIC8vIHRyYW5zQ2FycyA9IGFycltjXVswXS5jYXJyaWVycztcbiAgICAgIHRyYW5zQ2FycyA9IGFycltjXVtyXTtcbiAgICAgIGlmICh0cmFuc0NhcnMuY3VycmVudFN0YXRpb25JRCAhPSAwKSB7XG4gICAgICAgIC8vIGNsZWFyIGNhcnJpZXIgaG9tZSBjZWxsXG4gICAgICAgIGFycltjXVtyXSA9IG51bGw7XG4gICAgICAgIC8vIGdldCByb3cgb2YgY3VycmVudCByZXNvdXJjZSBzdGF0aW9uXG4gICAgICAgIGZvciAobSA9IDE7IG0gPCByb3dDb3VudDsgbSsrKSB7XG4gICAgICAgICAgaWYgKGFycltjXVttXS5pZCA9PSB0cmFuc0NhcnMuY3VycmVudFN0YXRpb25JRCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbW92ZSBjYXJyaWVyIHRvIHJvdyBvZiByZXNvdXJjZVxuICAgICAgICBhcnJbY11bbV0gPSB0cmFuc0NhcnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTG9vcCB0byBkaXNwbGF5IHRoZSBlbGVtZW50cyBvZiAyRCBhcnJheS4gXG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuICBmb3IgKHIgPSAwOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgIGZvciAoYyA9IDA7IGMgPCBjb2xDb3VudDsgYysrKSB7XG4gICAgICBpZiAoYXJyW2NdW3JdKVxuICAgICAgICBvdXRwdXQgKz0gKGFycltjXVtyXSkubmFtZSArIFwiIFwiO1xuICAgICAgZWxzZSBvdXRwdXQgKz0gXCJudWxsIFwiO1xuICAgIH1cbiAgICBvdXRwdXQgKz0gXCJcXG5cIjtcbiAgfVxuICAvLyBjb25zb2xlLmxvZyhvdXRwdXQpO1xuICAvLyBjb25zb2xlLmxvZyhhcnIpO1xuICByZXR1cm4gYXJyO1xufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMubWF0cml4ID0gbWF0cml4O1xuIiwiY29uc3Qgd3JhcHBlclRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdmlldy93cmFwcGVyVGVtcGxhdGUnKTtcblxubGV0IHJlbmRlclJlc291cmNlID0gd3JhcHBlclRlbXBsYXRlLnJlbmRlclJlc291cmNlO1xubGV0IHJlbmRlclRyYW5zcG9ydCA9IHdyYXBwZXJUZW1wbGF0ZS5yZW5kZXJUcmFuc3BvcnQ7XG5sZXQgcmVuZGVyQ2FycmllciA9IHdyYXBwZXJUZW1wbGF0ZS5yZW5kZXJDYXJyaWVyO1xubGV0IHJlbmRlclN0YXRpb24gPSB3cmFwcGVyVGVtcGxhdGUucmVuZGVyU3RhdGlvbjtcblxuY2xhc3MgUmVzb3VyY2Uge1xuICBjb25zdHJ1Y3RvcihfcmVzb3VyY2UpIHtcbiAgICB0aGlzLnJlc291cmNlID0gX3Jlc291cmNlO1xuICB9XG5cbiAgZ2V0IGlkKCkgeyByZXR1cm4gdGhpcy5yZXNvdXJjZS5SZXNvdXJjZUlEOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5yZXNvdXJjZS5OYW1lOyB9XG4gIGdldCByZWFkeSgpIHsgcmV0dXJuIHRoaXMucmVzb3VyY2UuUmVhZHk7IH1cbiAgZ2V0IGJ1c3koKSB7IHJldHVybiB0aGlzLnJlc291cmNlLkJ1c3k7IH1cbiAgZ2V0IHNlcnZpY2UoKSB7IHJldHVybiB0aGlzLnJlc291cmNlLlNlcnZpY2U7IH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHJlbmRlclJlc291cmNlKHRoaXMpO1xuICB9XG59XG5cbmNsYXNzIFRyYW5zcG9ydCB7XG4gIGNvbnN0cnVjdG9yKF90cmFuc3BvcnQpIHtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IF90cmFuc3BvcnQ7XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLnRyYW5zcG9ydC5UcmFuc3BvcnRJRDsgfVxuICBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMudHJhbnNwb3J0Lk5hbWU7IH1cbiAgZ2V0IGNhcnJpZXJzKCkgeyByZXR1cm4gdGhpcy50cmFuc3BvcnQuQ2FycmllcnM7IH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHJlbmRlclRyYW5zcG9ydCh0aGlzKTtcbiAgfVxufVxuXG5jbGFzcyBDYXJyaWVyIHtcbiAgY29uc3RydWN0b3IoX2NhcnJpZXIpIHtcbiAgICB0aGlzLmNhcnJpZXIgPSBfY2FycmllcjtcbiAgICB0aGlzLmhvbWUgPSB7IGNvbDogMCwgcm93OiAwIH07XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLmNhcnJpZXIuQ2FycmllcklEOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gXCJjYXJfXCIgKyB0aGlzLmlkOyB9XG4gIGdldCBvcmRlck51bWJlcigpIHsgcmV0dXJuIHRoaXMuY2Fycmllci5PcmRlck51bWJlcjsgfVxuICBnZXQgcHJvZHVjdCgpIHsgcmV0dXJuIHRoaXMuY2Fycmllci5Qcm9kdWN0OyB9XG4gIGdldCBjdXJyZW50U3RhdGlvbklEKCkgeyByZXR1cm4gdGhpcy5jYXJyaWVyLkN1cnJlbnRTdGF0aW9uSUQ7IH1cbiAgZ2V0IGRlc3RpbmF0aW9uU3RhdGlvbklEKCkgeyByZXR1cm4gdGhpcy5jYXJyaWVyLkRlc3RpbmF0aW9uU3RhdGlvbklEOyB9XG4gIGdldCBtb3ZpbmcoKSB7IHJldHVybiB0aGlzLmNhcnJpZXIubW92aW5nOyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiByZW5kZXJDYXJyaWVyKHRoaXMpO1xuICB9XG5cbiAgc2V0SG9tZShjLCByKSB7XG4gICAgdGhpcy5ob21lLmNvbCA9IGM7XG4gICAgdGhpcy5ob21lLnJvdyA9IHI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuY2xhc3MgU3RhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKF9zdGF0aW9uKSB7XG4gICAgdGhpcy5zdGF0aW9uID0gX3N0YXRpb247XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLnN0YXRpb24uU3RhdGlvbklEOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gXCJzdGF0X1wiICsgdGhpcy5pZDsgfVxuICBnZXQgdHJhbnNwb3J0SUQoKSB7IHJldHVybiB0aGlzLnN0YXRpb24uVHJhbnNwb3J0SUQ7IH1cbiAgZ2V0IHRyYW5zcG9ydE5hbWUoKSB7IHJldHVybiB0aGlzLnN0YXRpb24uTmFtZTsgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gcmVuZGVyU3RhdGlvbih0aGlzKTtcbiAgfVxufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5tb2R1bGUuZXhwb3J0cy5SZXNvdXJjZSA9IFJlc291cmNlO1xubW9kdWxlLmV4cG9ydHMuVHJhbnNwb3J0ID0gVHJhbnNwb3J0O1xubW9kdWxlLmV4cG9ydHMuQ2FycmllciA9IENhcnJpZXI7XG5tb2R1bGUuZXhwb3J0cy5TdGF0aW9uID0gU3RhdGlvbjsiLCIvL2h0dHBzOi8vd2VzYm9zLmNvbS90ZW1wbGF0ZS1zdHJpbmdzLWh0bWwvXG5cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihyb3dzKXtcbiAgbGV0IGhlYWRlciA9IFtcIlJlc291cmNlXCJdO1xuICBmb3IgKGxldCBjID0gMTsgYyA8IHJvd3NbMF0ubGVuZ3RoOyBjKyspIHtcbiAgICBoZWFkZXIucHVzaChcIlRyYW5zcG9ydFwiKTtcbiAgfVxuICByZXR1cm4gaGVhZGVyLm1hcChoZWFkID0+IGBcbiAgPHRoPlxuICAgICR7aGVhZH1cbiAgPC90aD5cbiAgYCkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclJvdyhjZWxscykge1xuICByZXR1cm4gY2VsbHMubWFwKGNlbGwgPT4gYFxuICA8dGQ+XG4gICAgJHtjZWxsICE9IFwibnVsbFwiID8gYCR7Y2VsbC5yZW5kZXIoKX1gIDogJyd9XG4gIDwvdGQ+XG4gIGApLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYWJsZShyb3dzKSB7XG4gIHJldHVybiBgXG5cdDx0YWJsZSBzdHlsZT1cIndpZHRoOjEwMCVcIj5cbiAgICA8dHI+XG4gICAgICAke3JlbmRlckhlYWRlcihyb3dzKX1cbiAgICA8L3RyPlxuICAgICR7cm93cy5tYXAocm93ID0+IGBcbiAgICA8dHI+XG4gICAgICAke3JlbmRlclJvdyhyb3cpfVxuICAgIDwvdHI+XG4gICAgYCkuam9pbignJyl9XG5cdDwvdGFibGU+XG4gIGA7XG59XG5cbi8vIGV4b3J0cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cy5yZW5kZXJUYWJsZSA9IHJlbmRlclRhYmxlOyIsImNvbnN0IHRhYmxlVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RhYmxlVGVtcGxhdGUnKVxuXG5sZXQgcmVuZGVyVGFibGUgPSB0YWJsZVRlbXBsYXRlLnJlbmRlclRhYmxlO1xuXG5mdW5jdGlvbiB0YWJsZVZpZXcobWF0cml4KSB7XG5cbiAgLy8gY29uc29sZS5sb2coXCJ0YWJsZVZpZXcuanNcIik7XG4gIC8vIGNvbnNvbGUubG9nKG1hdHJpeCk7XG4gIGxldCBjb2xDb3VudCA9IG1hdHJpeC5sZW5ndGg7XG4gIGxldCByb3dDb3VudCA9IG1hdHJpeFswXS5sZW5ndGg7XG4gIC8vIGNvbnNvbGUubG9nKFwiY29sQ291bnQ6IFwiICsgY29sQ291bnQgKyBcIiwgcm93Q291bnQ6IFwiICsgcm93Q291bnQpXG4gIGxldCByb3dzID0gW107XG4gIGxldCBjZWxscyA9IFtdO1xuICBmb3IgKHIgPSAwOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgIGZvciAoYyA9IDA7IGMgPCBjb2xDb3VudDsgYysrKSB7XG4gICAgICBpZiAobWF0cml4W2NdW3JdKVxuICAgICAgICBjZWxscy5wdXNoKG1hdHJpeFtjXVtyXSkubmFtZTtcbiAgICAgIGVsc2UgY2VsbHMucHVzaChcIm51bGxcIik7XG4gICAgfVxuICAgIC8vIGh0bWwgKz0gXCI8YnI+XCI7XG4gICAgcm93cy5wdXNoKGNlbGxzKTtcbiAgICBjZWxscyA9IFtdO1xuICB9XG4gIC8vIGNvbnNvbGUubG9nKHJvd3MpO1xuICBsZXQgcmVuZGVyZWQgPSByZW5kZXJUYWJsZShyb3dzKTtcbiAgLy8gY29uc29sZS5sb2coXCJyZW5kZXJlZDogXCIgKyByZW5kZXJlZCk7XG4gIHJldHVybiByZW5kZXJlZDtcbn1cblxuLy8gZXhwb3J0cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cy50YWJsZVZpZXcgPSB0YWJsZVZpZXc7IiwiXG5mdW5jdGlvbiByZW5kZXJSZXNvdXJjZShyZXNvdXJjZSkge1xuICByZXR1cm4gYFxuICA8dGFibGUgaWQ9XCJyZXNcIj5cbiAgICA8dHI+XG4gICAgICA8dGQgaWQ9XCJyZXNOYW1lXCI+TmFtZTwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNDb3N0XCI+Q29zdDwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNUaW1lXCI+VGltZTwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNSZWFkeVwiPlI8L3RkPlxuICAgICAgPHRkIGlkPVwicmVzQnVzeVwiPkI8L3RkPlxuICAgICAgPHRkIGlkPVwicmVzU2VydmljZVwiPlNlcnZpY2U8L3RkPlxuICAgIDwvdHI+XG4gICAgPHRyIGlkPVwidmFsdWVcIj5cbiAgICAgIDx0ZD4ke3Jlc291cmNlLm5hbWV9PC90ZD5cbiAgICAgIDx0ZD4xPC90ZD5cbiAgICAgIDx0ZD4xPC90ZD5cbiAgICAgIDx0ZD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ+XG4gICAgICA8L3RkPlxuICAgICAgPHRkPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQ+JHtyZXNvdXJjZS5zZXJ2aWNlID8gcmVzb3VyY2Uuc2VydmljZSA6IFwiXCJ9PC90ZD5cbiAgICA8L3RyPlxuICA8L3RhYmxlPlxuICBgO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUcmFuc3BvcnQodHJhbnNwb3J0KSB7XG4gIHJldHVybiB0cmFuc3BvcnQubmFtZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FycmllcihjYXJyaWVyKSB7XG4gIHJldHVybiBgXG4gIDx0YWJsZT5cbiAgICA8dHI+XG4gICAgICA8dGQ+TnI8L3RkPlxuICAgICAgPHRkPlByb2R1Y3Q8L3RkPlxuICAgICAgPHRkPkNvc3Q8L3RkPlxuICAgICAgPHRkPlRpbWU8L3RkPlxuICAgICAgPHRkPkNJRDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgaWQ9XCJ2YWx1ZVwiPlxuICAgICAgPHRkPiR7Y2Fycmllci5vcmRlck51bWJlciA/IGNhcnJpZXIub3JkZXJOdW1iZXIuc3Vic3RyKDAsIDQpICsgXCIuLi5cIiA6IFwiXCJ9PC90ZD5cbiAgICAgIDx0ZD4ke2NhcnJpZXIucHJvZHVjdCA/IGNhcnJpZXIucHJvZHVjdCA6IFwiXCJ9PC90ZD5cbiAgICAgIDx0ZD4wPC90ZD5cbiAgICAgIDx0ZD4wPC90ZD5cbiAgICAgIDx0ZD4ke2NhcnJpZXIuaWR9PC90ZD5cbiAgICA8L3RyPlxuICA8L3RhYmxlPlxuICBgO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTdGF0aW9uKHN0YXRpb24pIHtcbiAgcmV0dXJuIGBcbiAgPHRhYmxlIGlkPVwidHJhbnNTdGF0aW9uXCI+XG4gICAgPHRyPlxuICAgICAgPHRkPlxuICAgICAgICAke3N0YXRpb24uaWR9XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGFibGU+XG4gIGA7XG59XG5cbi8vIGV4cG9ydHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzLnJlbmRlclJlc291cmNlID0gcmVuZGVyUmVzb3VyY2U7IG1vZHVsZS5leHBvcnRzLnJlbmRlclRyYW5zcG9ydCA9IHJlbmRlclRyYW5zcG9ydDsgbW9kdWxlLmV4cG9ydHMucmVuZGVyQ2FycmllciA9IHJlbmRlckNhcnJpZXI7IG1vZHVsZS5leHBvcnRzLnJlbmRlclN0YXRpb24gPSByZW5kZXJTdGF0aW9uOyJdfQ==
