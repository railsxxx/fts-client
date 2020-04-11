(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"../model/json.js":3,"../model/matrix.js":4,"../view/tableView.js":7}],2:[function(require,module,exports){
// node_modules/watchify/bin/cmd.js src/main.js -d -o dist/bundle.js -v
// node_modules/browserify/bin/cmd.js src/main.js -o dist/bundle.js -d

const controller = require('./controller/crud.js')

const createTable = controller.createTable;

createTable();

console.log("main.js");


},{"./controller/crud.js":1}],3:[function(require,module,exports){

/*
let data;

let init = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';
console.log(init);
data = JSON.parse(init);
*/

let werker = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":true,"Service":"Pfeife_Material"},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":"218915A7-5769-4F52-96F5-5D0725D0A70F","Product":"Pfeife_Gravur","CurrentStationID":1,"DestinationStationID":1,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';

function fetchJson() {
  // console.log(werker);
  return JSON.parse(werker);
}

async function fetchJsonAsync() {
  const res = await fetch('./json/werker.json');
  let json = await res.json();
  // console.log(json);
  return Promise.resolve(json);
}

// exports ###########################
module.exports.updateJSON = fetchJsonAsync;
module.exports.fetchJson = fetchJson;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udHJvbGxlci9jcnVkLmpzIiwic3JjL21haW4uanMiLCJzcmMvbW9kZWwvanNvbi5qcyIsInNyYy9tb2RlbC9tYXRyaXguanMiLCJzcmMvbW9kZWwvd3JhcHBlcnMuanMiLCJzcmMvdmlldy90YWJsZVRlbXBsYXRlLmpzIiwic3JjL3ZpZXcvdGFibGVWaWV3LmpzIiwic3JjL3ZpZXcvd3JhcHBlclRlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBqc29uID0gcmVxdWlyZSgnLi4vbW9kZWwvanNvbi5qcycpXG5jb25zdCBtb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVsL21hdHJpeC5qcycpO1xuY29uc3QgdGFibGUgPSByZXF1aXJlKCcuLi92aWV3L3RhYmxlVmlldy5qcycpO1xuXG5sZXQgZmV0Y2hKc29uID0ganNvbi5mZXRjaEpzb247XG5sZXQgbWF0cml4ID0gbW9kZWwubWF0cml4O1xubGV0IHRhYmxlVmlldyA9IHRhYmxlLnRhYmxlVmlldztcblxuXG5mdW5jdGlvbiBjcmVhdGVUYWJsZSgpIHtcbiAgbGV0IGRhdGEgPSBmZXRjaEpzb24oKTtcbiAgY29uc29sZS5sb2coXCJjcmVhdGVUYWJsZVwiKTtcbiAgY29uc29sZS5sb2coZGF0YSk7XG4gIGxldCB0YWJsZURhdGEgPSBtYXRyaXgoZGF0YSk7XG4gIGxldCB0YWJsZUh0bWwgPSB0YWJsZVZpZXcodGFibGVEYXRhKTtcbiAgLy8gY29uc29sZS5sb2coXCJ0YWJsZUh0bWw6IFwiICsgdGFibGVIdG1sKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikuaW5uZXJIVE1MID0gdGFibGVIdG1sO1xufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlVGFibGUgPSBjcmVhdGVUYWJsZTsiLCIvLyBub2RlX21vZHVsZXMvd2F0Y2hpZnkvYmluL2NtZC5qcyBzcmMvbWFpbi5qcyAtZCAtbyBkaXN0L2J1bmRsZS5qcyAtdlxuLy8gbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvYmluL2NtZC5qcyBzcmMvbWFpbi5qcyAtbyBkaXN0L2J1bmRsZS5qcyAtZFxuXG5jb25zdCBjb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL2NydWQuanMnKVxuXG5jb25zdCBjcmVhdGVUYWJsZSA9IGNvbnRyb2xsZXIuY3JlYXRlVGFibGU7XG5cbmNyZWF0ZVRhYmxlKCk7XG5cbmNvbnNvbGUubG9nKFwibWFpbi5qc1wiKTtcblxuIiwiXG4vKlxubGV0IGRhdGE7XG5cbmxldCBpbml0ID0gJ3tcIlJlc291cmNlc1wiOlt7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjoxfSx7XCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIixcIlN0YXRpb25JRFwiOjF9XSxcIlJlc291cmNlSURcIjoxLFwiTmFtZVwiOlwiV2Vya2VyMVwiLFwiUmVhZHlcIjp0cnVlLFwiQnVzeVwiOmZhbHNlLFwiU2VydmljZVwiOm51bGx9LHtcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjoyLFwiTmFtZVwiOlwiTcO8Z2FcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjpmYWxzZSxcIlNlcnZpY2VcIjpudWxsfSx7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjozfV0sXCJSZXNvdXJjZUlEXCI6MyxcIk5hbWVcIjpcIkxhc2VyXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH0se1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjo0LFwiTmFtZVwiOlwiSGVybWxlXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH1dLFwiVHJhbnNwb3J0c1wiOlt7XCJDYXJyaWVyc1wiOlt7XCJDYXJyaWVySURcIjo0LFwiT3JkZXJOdW1iZXJcIjpudWxsLFwiUHJvZHVjdFwiOm51bGwsXCJDdXJyZW50U3RhdGlvbklEXCI6MCxcIkRlc3RpbmF0aW9uU3RhdGlvbklEXCI6MCxcIm1vdmluZ1wiOmZhbHNlfV0sXCJUcmFuc3BvcnRJRFwiOjEsXCJOYW1lXCI6XCJTdGVpblRyYW5zZmVyYmFuZFwifSx7XCJDYXJyaWVyc1wiOlt7XCJDYXJyaWVySURcIjoxLFwiT3JkZXJOdW1iZXJcIjpudWxsLFwiUHJvZHVjdFwiOm51bGwsXCJDdXJyZW50U3RhdGlvbklEXCI6MCxcIkRlc3RpbmF0aW9uU3RhdGlvbklEXCI6MCxcIm1vdmluZ1wiOmZhbHNlfV0sXCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIn1dfSc7XG5jb25zb2xlLmxvZyhpbml0KTtcbmRhdGEgPSBKU09OLnBhcnNlKGluaXQpO1xuKi9cblxubGV0IHdlcmtlciA9ICd7XCJSZXNvdXJjZXNcIjpbe1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjEsXCJOYW1lXCI6XCJTdGVpblRyYW5zZmVyYmFuZFwiLFwiU3RhdGlvbklEXCI6MX0se1wiVHJhbnNwb3J0SURcIjoyLFwiTmFtZVwiOlwiRlRTXCIsXCJTdGF0aW9uSURcIjoxfV0sXCJSZXNvdXJjZUlEXCI6MSxcIk5hbWVcIjpcIldlcmtlcjFcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjp0cnVlLFwiU2VydmljZVwiOlwiUGZlaWZlX01hdGVyaWFsXCJ9LHtcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjoyLFwiTmFtZVwiOlwiTcO8Z2FcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjpmYWxzZSxcIlNlcnZpY2VcIjpudWxsfSx7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjozfV0sXCJSZXNvdXJjZUlEXCI6MyxcIk5hbWVcIjpcIkxhc2VyXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH0se1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjo0LFwiTmFtZVwiOlwiSGVybWxlXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH1dLFwiVHJhbnNwb3J0c1wiOlt7XCJDYXJyaWVyc1wiOlt7XCJDYXJyaWVySURcIjo0LFwiT3JkZXJOdW1iZXJcIjpcIjIxODkxNUE3LTU3NjktNEY1Mi05NkY1LTVEMDcyNUQwQTcwRlwiLFwiUHJvZHVjdFwiOlwiUGZlaWZlX0dyYXZ1clwiLFwiQ3VycmVudFN0YXRpb25JRFwiOjEsXCJEZXN0aW5hdGlvblN0YXRpb25JRFwiOjEsXCJtb3ZpbmdcIjpmYWxzZX1dLFwiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIn0se1wiQ2FycmllcnNcIjpbe1wiQ2FycmllcklEXCI6MSxcIk9yZGVyTnVtYmVyXCI6bnVsbCxcIlByb2R1Y3RcIjpudWxsLFwiQ3VycmVudFN0YXRpb25JRFwiOjAsXCJEZXN0aW5hdGlvblN0YXRpb25JRFwiOjAsXCJtb3ZpbmdcIjpmYWxzZX1dLFwiVHJhbnNwb3J0SURcIjoyLFwiTmFtZVwiOlwiRlRTXCJ9XX0nO1xuXG5mdW5jdGlvbiBmZXRjaEpzb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKHdlcmtlcik7XG4gIHJldHVybiBKU09OLnBhcnNlKHdlcmtlcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoSnNvbkFzeW5jKCkge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnLi9qc29uL3dlcmtlci5qc29uJyk7XG4gIGxldCBqc29uID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgLy8gY29uc29sZS5sb2coanNvbik7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoanNvbik7XG59XG5cbi8vIGV4cG9ydHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cy51cGRhdGVKU09OID0gZmV0Y2hKc29uQXN5bmM7XG5tb2R1bGUuZXhwb3J0cy5mZXRjaEpzb24gPSBmZXRjaEpzb247XG5cbiIsImNvbnN0IHdyYXBwZXJzID0gcmVxdWlyZSgnLi93cmFwcGVycy5qcycpO1xuXG5sZXQgUmVzb3VyY2UgPSB3cmFwcGVycy5SZXNvdXJjZTtcbmxldCBUcmFuc3BvcnQgPSB3cmFwcGVycy5UcmFuc3BvcnQ7XG5sZXQgQ2FycmllciA9IHdyYXBwZXJzLkNhcnJpZXI7XG5sZXQgU3RhdGlvbiA9IHdyYXBwZXJzLlN0YXRpb247XG5cbmZ1bmN0aW9uIG1hdHJpeChkYXRhKSB7XG5cbiAgLy8gY29uc29sZS5sb2coXCJtYXRyaXguanNcIik7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gIGxldCB0cmFuc0NvdW50ID0gZGF0YS5UcmFuc3BvcnRzLmxlbmd0aDtcbiAgbGV0IHJlc0NvdW50ID0gZGF0YS5SZXNvdXJjZXMubGVuZ3RoO1xuXG4gIC8vIENyZWF0ZSBhcnJheSBjb2x1bW5zXG4gIGxldCBjb2xDb3VudCA9IHRyYW5zQ291bnQgKyAxO1xuICB2YXIgYXJyID0gbmV3IEFycmF5KGNvbENvdW50KTtcbiAgbGV0IGMgPSAwOyAvLyBjb2x1bW5zXG4gIGxldCByID0gMDsgLy8gcm93c1xuXG4gIC8vIEFkZCBlbXB0eSByb3cgYXJyYXkgZm9yIGVhY2ggY29sdW1uXG4gIGxldCByb3dDb3VudCA9IDA7XG4gIGZvciAoYyA9IDA7IGMgPCBjb2xDb3VudDsgYysrKSB7XG4gICAgYXJyW2NdID0gW107XG4gIH1cblxuICAvLyBhZGQgcm93IG9mIGNvbHVtbiBoZWFkZXJcbiAgcm93Q291bnQgPSAxO1xuICBhcnJbMF1bMF0gPSBudWxsO1xuICBmb3IgKGMgPSAxOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgIC8vIGFycltjXVswXSA9IGRhdGEuVHJhbnNwb3J0c1tjIC0gMV07XG4gICAgYXJyW2NdWzBdID0gbmV3IFRyYW5zcG9ydChkYXRhLlRyYW5zcG9ydHNbYyAtIDFdKTtcbiAgfVxuXG4gIC8vIEFkZCBhIHJvdyBmb3IgZWFjaCByZXNvdXJjZVxuICByb3dDb3VudCArPSByZXNDb3VudDtcbiAgbGV0IHJlcywgcmVzVHJhbnM7XG4gIGZvciAociA9IDE7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgcmVzID0gZGF0YS5SZXNvdXJjZXNbciAtIDFdO1xuICAgIC8vIGFkZCByZXNvdXJjZSBpbiBmaXJzdCBjb2x1bW5cbiAgICBhcnJbMF1bcl0gPSBuZXcgUmVzb3VyY2UocmVzKTtcbiAgICAvLyBBZGQgc3RhdGlvbklEIGlmIGFueSBwZXIgdHJhbnNwb3J0IGNvbHVtblxuICAgIGZvciAoYyA9IDE7IGMgPCBjb2xDb3VudDsgYysrKSB7XG4gICAgICByZXNUcmFucyA9IHJlcy5SZXNUcmFuc3BvcnRzO1xuICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCByZXNUcmFucy5sZW5ndGg7IHQrKykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInI6IFwiICsgciArIFwiLCBjOiBcIiArIGMgKyBcIiwgYXJyW2NdWzBdLnRyYW5zcG9ydElEOiBcIiArIGFycltjXVswXS50cmFuc3BvcnRJRCArIFwiLCByZXNUcmFuc1t0XS5UcmFuc3BvcnRJRDogXCIgKyByZXNUcmFuc1t0XS5UcmFuc3BvcnRJRCk7XG4gICAgICAgIGlmIChhcnJbY11bMF0uaWQgPT0gcmVzVHJhbnNbdF0uVHJhbnNwb3J0SUQpIHtcbiAgICAgICAgICBhcnJbY11bcl0gPSBuZXcgU3RhdGlvbihyZXNUcmFuc1t0XSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyW2NdW3JdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBhIHJvdyBmb3IgZWFjaCB0cmFuc3BvcnQgY2FycmllclxuICBsZXQgbWF4Q2FycmllckNvdW50ID0gMDtcbiAgZm9yIChsZXQgdCA9IDA7IHQgPCB0cmFuc0NvdW50OyB0KyspIHtcbiAgICBpZiAobWF4Q2FycmllckNvdW50IDwgZGF0YS5UcmFuc3BvcnRzW3RdLkNhcnJpZXJzLmxlbmd0aCkgbWF4Q2FycmllckNvdW50ID0gZGF0YS5UcmFuc3BvcnRzW3RdLkNhcnJpZXJzLmxlbmd0aFxuICB9XG4gIGxldCByb3dBZnRlclJlc291cmNlcyA9IHJvd0NvdW50O1xuICByb3dDb3VudCArPSBtYXhDYXJyaWVyQ291bnQ7XG4gIGxldCB0cmFuc0NhcnMsIHQgPSAwO1xuICBmb3IgKHIgPSByb3dBZnRlclJlc291cmNlczsgciA8IHJvd0NvdW50OyByKyspIHtcbiAgICBhcnJbMF1bcl0gPSBudWxsO1xuICAgIGZvciAoYyA9IDE7IGMgPCBjb2xDb3VudDsgYysrKSB7XG4gICAgICB0cmFuc0NhcnMgPSBhcnJbY11bMF0uY2FycmllcnM7XG4gICAgICBhcnJbY11bcl0gPSAobmV3IENhcnJpZXIodHJhbnNDYXJzW3RdKS5zZXRIb21lKGMsIHIpKTtcbiAgICB9XG4gICAgdCsrO1xuICB9XG5cbiAgLy8gTW92ZSBjYXJyaWVyIHRvIHJlc291cmNlIHN0YXRpb25cbiAgbGV0IG0gPSAwO1xuICBmb3IgKHIgPSByb3dBZnRlclJlc291cmNlczsgciA8IHJvd0NvdW50OyByKyspIHtcbiAgICBmb3IgKGMgPSAxOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgICAgLy8gdHJhbnNDYXJzID0gYXJyW2NdWzBdLmNhcnJpZXJzO1xuICAgICAgdHJhbnNDYXJzID0gYXJyW2NdW3JdO1xuICAgICAgaWYgKHRyYW5zQ2Fycy5jdXJyZW50U3RhdGlvbklEICE9IDApIHtcbiAgICAgICAgLy8gY2xlYXIgY2FycmllciBob21lIGNlbGxcbiAgICAgICAgYXJyW2NdW3JdID0gbnVsbDtcbiAgICAgICAgLy8gZ2V0IHJvdyBvZiBjdXJyZW50IHJlc291cmNlIHN0YXRpb25cbiAgICAgICAgZm9yIChtID0gMTsgbSA8IHJvd0NvdW50OyBtKyspIHtcbiAgICAgICAgICBpZiAoYXJyW2NdW21dLmlkID09IHRyYW5zQ2Fycy5jdXJyZW50U3RhdGlvbklEKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBtb3ZlIGNhcnJpZXIgdG8gcm93IG9mIHJlc291cmNlXG4gICAgICAgIGFycltjXVttXSA9IHRyYW5zQ2FycztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBMb29wIHRvIGRpc3BsYXkgdGhlIGVsZW1lbnRzIG9mIDJEIGFycmF5LiBcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGZvciAociA9IDA7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgZm9yIChjID0gMDsgYyA8IGNvbENvdW50OyBjKyspIHtcbiAgICAgIGlmIChhcnJbY11bcl0pXG4gICAgICAgIG91dHB1dCArPSAoYXJyW2NdW3JdKS5uYW1lICsgXCIgXCI7XG4gICAgICBlbHNlIG91dHB1dCArPSBcIm51bGwgXCI7XG4gICAgfVxuICAgIG91dHB1dCArPSBcIlxcblwiO1xuICB9XG4gIC8vIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gIC8vIGNvbnNvbGUubG9nKGFycik7XG4gIHJldHVybiBhcnI7XG59XG5cbi8vIGV4cG9ydHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cy5tYXRyaXggPSBtYXRyaXg7XG4iLCJjb25zdCB3cmFwcGVyVGVtcGxhdGUgPSByZXF1aXJlKCcuLi92aWV3L3dyYXBwZXJUZW1wbGF0ZScpO1xuXG5sZXQgcmVuZGVyUmVzb3VyY2UgPSB3cmFwcGVyVGVtcGxhdGUucmVuZGVyUmVzb3VyY2U7XG5sZXQgcmVuZGVyVHJhbnNwb3J0ID0gd3JhcHBlclRlbXBsYXRlLnJlbmRlclRyYW5zcG9ydDtcbmxldCByZW5kZXJDYXJyaWVyID0gd3JhcHBlclRlbXBsYXRlLnJlbmRlckNhcnJpZXI7XG5sZXQgcmVuZGVyU3RhdGlvbiA9IHdyYXBwZXJUZW1wbGF0ZS5yZW5kZXJTdGF0aW9uO1xuXG5jbGFzcyBSZXNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yKF9yZXNvdXJjZSkge1xuICAgIHRoaXMucmVzb3VyY2UgPSBfcmVzb3VyY2U7XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLnJlc291cmNlLlJlc291cmNlSUQ7IH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLnJlc291cmNlLk5hbWU7IH1cbiAgZ2V0IHJlYWR5KCkgeyByZXR1cm4gdGhpcy5yZXNvdXJjZS5SZWFkeTsgfVxuICBnZXQgYnVzeSgpIHsgcmV0dXJuIHRoaXMucmVzb3VyY2UuQnVzeTsgfVxuICBnZXQgc2VydmljZSgpIHsgcmV0dXJuIHRoaXMucmVzb3VyY2UuU2VydmljZTsgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gcmVuZGVyUmVzb3VyY2UodGhpcyk7XG4gIH1cbn1cblxuY2xhc3MgVHJhbnNwb3J0IHtcbiAgY29uc3RydWN0b3IoX3RyYW5zcG9ydCkge1xuICAgIHRoaXMudHJhbnNwb3J0ID0gX3RyYW5zcG9ydDtcbiAgfVxuXG4gIGdldCBpZCgpIHsgcmV0dXJuIHRoaXMudHJhbnNwb3J0LlRyYW5zcG9ydElEOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy50cmFuc3BvcnQuTmFtZTsgfVxuICBnZXQgY2FycmllcnMoKSB7IHJldHVybiB0aGlzLnRyYW5zcG9ydC5DYXJyaWVyczsgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gcmVuZGVyVHJhbnNwb3J0KHRoaXMpO1xuICB9XG59XG5cbmNsYXNzIENhcnJpZXIge1xuICBjb25zdHJ1Y3RvcihfY2Fycmllcikge1xuICAgIHRoaXMuY2FycmllciA9IF9jYXJyaWVyO1xuICAgIHRoaXMuaG9tZSA9IHsgY29sOiAwLCByb3c6IDAgfTtcbiAgfVxuXG4gIGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuY2Fycmllci5DYXJyaWVySUQ7IH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiBcImNhcl9cIiArIHRoaXMuaWQ7IH1cbiAgZ2V0IG9yZGVyTnVtYmVyKCkgeyByZXR1cm4gdGhpcy5jYXJyaWVyLk9yZGVyTnVtYmVyOyB9XG4gIGdldCBwcm9kdWN0KCkgeyByZXR1cm4gdGhpcy5jYXJyaWVyLlByb2R1Y3Q7IH1cbiAgZ2V0IGN1cnJlbnRTdGF0aW9uSUQoKSB7IHJldHVybiB0aGlzLmNhcnJpZXIuQ3VycmVudFN0YXRpb25JRDsgfVxuICBnZXQgZGVzdGluYXRpb25TdGF0aW9uSUQoKSB7IHJldHVybiB0aGlzLmNhcnJpZXIuRGVzdGluYXRpb25TdGF0aW9uSUQ7IH1cbiAgZ2V0IG1vdmluZygpIHsgcmV0dXJuIHRoaXMuY2Fycmllci5tb3Zpbmc7IH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHJlbmRlckNhcnJpZXIodGhpcyk7XG4gIH1cblxuICBzZXRIb21lKGMsIHIpIHtcbiAgICB0aGlzLmhvbWUuY29sID0gYztcbiAgICB0aGlzLmhvbWUucm93ID0gcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5jbGFzcyBTdGF0aW9uIHtcbiAgY29uc3RydWN0b3IoX3N0YXRpb24pIHtcbiAgICB0aGlzLnN0YXRpb24gPSBfc3RhdGlvbjtcbiAgfVxuXG4gIGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuc3RhdGlvbi5TdGF0aW9uSUQ7IH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiBcInN0YXRfXCIgKyB0aGlzLmlkOyB9XG4gIGdldCB0cmFuc3BvcnRJRCgpIHsgcmV0dXJuIHRoaXMuc3RhdGlvbi5UcmFuc3BvcnRJRDsgfVxuICBnZXQgdHJhbnNwb3J0TmFtZSgpIHsgcmV0dXJuIHRoaXMuc3RhdGlvbi5OYW1lOyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiByZW5kZXJTdGF0aW9uKHRoaXMpO1xuICB9XG59XG5cbi8vIGV4cG9ydHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbm1vZHVsZS5leHBvcnRzLlJlc291cmNlID0gUmVzb3VyY2U7XG5tb2R1bGUuZXhwb3J0cy5UcmFuc3BvcnQgPSBUcmFuc3BvcnQ7XG5tb2R1bGUuZXhwb3J0cy5DYXJyaWVyID0gQ2Fycmllcjtcbm1vZHVsZS5leHBvcnRzLlN0YXRpb24gPSBTdGF0aW9uOyIsIi8vaHR0cHM6Ly93ZXNib3MuY29tL3RlbXBsYXRlLXN0cmluZ3MtaHRtbC9cblxuZnVuY3Rpb24gcmVuZGVySGVhZGVyKHJvd3Mpe1xuICBsZXQgaGVhZGVyID0gW1wiUmVzb3VyY2VcIl07XG4gIGZvciAobGV0IGMgPSAxOyBjIDwgcm93c1swXS5sZW5ndGg7IGMrKykge1xuICAgIGhlYWRlci5wdXNoKFwiVHJhbnNwb3J0XCIpO1xuICB9XG4gIHJldHVybiBoZWFkZXIubWFwKGhlYWQgPT4gYFxuICA8dGg+XG4gICAgJHtoZWFkfVxuICA8L3RoPlxuICBgKS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUm93KGNlbGxzKSB7XG4gIHJldHVybiBjZWxscy5tYXAoY2VsbCA9PiBgXG4gIDx0ZD5cbiAgICAke2NlbGwgIT0gXCJudWxsXCIgPyBgJHtjZWxsLnJlbmRlcigpfWAgOiAnJ31cbiAgPC90ZD5cbiAgYCkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlKHJvd3MpIHtcbiAgcmV0dXJuIGBcblx0PHRhYmxlIHN0eWxlPVwid2lkdGg6MTAwJVwiPlxuICAgIDx0cj5cbiAgICAgICR7cmVuZGVySGVhZGVyKHJvd3MpfVxuICAgIDwvdHI+XG4gICAgJHtyb3dzLm1hcChyb3cgPT4gYFxuICAgIDx0cj5cbiAgICAgICR7cmVuZGVyUm93KHJvdyl9XG4gICAgPC90cj5cbiAgICBgKS5qb2luKCcnKX1cblx0PC90YWJsZT5cbiAgYDtcbn1cblxuLy8gZXhvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzLnJlbmRlclRhYmxlID0gcmVuZGVyVGFibGU7IiwiY29uc3QgdGFibGVUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGFibGVUZW1wbGF0ZScpXG5cbmxldCByZW5kZXJUYWJsZSA9IHRhYmxlVGVtcGxhdGUucmVuZGVyVGFibGU7XG5cbmZ1bmN0aW9uIHRhYmxlVmlldyhtYXRyaXgpIHtcblxuICAvLyBjb25zb2xlLmxvZyhcInRhYmxlVmlldy5qc1wiKTtcbiAgLy8gY29uc29sZS5sb2cobWF0cml4KTtcbiAgbGV0IGNvbENvdW50ID0gbWF0cml4Lmxlbmd0aDtcbiAgbGV0IHJvd0NvdW50ID0gbWF0cml4WzBdLmxlbmd0aDtcbiAgLy8gY29uc29sZS5sb2coXCJjb2xDb3VudDogXCIgKyBjb2xDb3VudCArIFwiLCByb3dDb3VudDogXCIgKyByb3dDb3VudClcbiAgbGV0IHJvd3MgPSBbXTtcbiAgbGV0IGNlbGxzID0gW107XG4gIGZvciAociA9IDA7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgZm9yIChjID0gMDsgYyA8IGNvbENvdW50OyBjKyspIHtcbiAgICAgIGlmIChtYXRyaXhbY11bcl0pXG4gICAgICAgIGNlbGxzLnB1c2gobWF0cml4W2NdW3JdKS5uYW1lO1xuICAgICAgZWxzZSBjZWxscy5wdXNoKFwibnVsbFwiKTtcbiAgICB9XG4gICAgLy8gaHRtbCArPSBcIjxicj5cIjtcbiAgICByb3dzLnB1c2goY2VsbHMpO1xuICAgIGNlbGxzID0gW107XG4gIH1cbiAgLy8gY29uc29sZS5sb2cocm93cyk7XG4gIGxldCByZW5kZXJlZCA9IHJlbmRlclRhYmxlKHJvd3MpO1xuICAvLyBjb25zb2xlLmxvZyhcInJlbmRlcmVkOiBcIiArIHJlbmRlcmVkKTtcbiAgcmV0dXJuIHJlbmRlcmVkO1xufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzLnRhYmxlVmlldyA9IHRhYmxlVmlldzsiLCJcbmZ1bmN0aW9uIHJlbmRlclJlc291cmNlKHJlc291cmNlKSB7XG4gIHJldHVybiBgXG4gIDx0YWJsZSBpZD1cInJlc1wiPlxuICAgIDx0cj5cbiAgICAgIDx0ZCBpZD1cInJlc05hbWVcIj5OYW1lPC90ZD5cbiAgICAgIDx0ZCBpZD1cInJlc0Nvc3RcIj5Db3N0PC90ZD5cbiAgICAgIDx0ZCBpZD1cInJlc1RpbWVcIj5UaW1lPC90ZD5cbiAgICAgIDx0ZCBpZD1cInJlc1JlYWR5XCI+UjwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNCdXN5XCI+QjwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNTZXJ2aWNlXCI+U2VydmljZTwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgaWQ9XCJ2YWx1ZVwiPlxuICAgICAgPHRkPiR7cmVzb3VyY2UubmFtZX08L3RkPlxuICAgICAgPHRkPjE8L3RkPlxuICAgICAgPHRkPjE8L3RkPlxuICAgICAgPHRkPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQ+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZD4ke3Jlc291cmNlLnNlcnZpY2UgPyByZXNvdXJjZS5zZXJ2aWNlIDogXCJcIn08L3RkPlxuICAgIDwvdHI+XG4gIDwvdGFibGU+XG4gIGA7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgcmV0dXJuIHRyYW5zcG9ydC5uYW1lO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYXJyaWVyKGNhcnJpZXIpIHtcbiAgcmV0dXJuIGBcbiAgPHRhYmxlPlxuICAgIDx0cj5cbiAgICAgIDx0ZD5OcjwvdGQ+XG4gICAgICA8dGQ+UHJvZHVjdDwvdGQ+XG4gICAgICA8dGQ+Q29zdDwvdGQ+XG4gICAgICA8dGQ+VGltZTwvdGQ+XG4gICAgICA8dGQ+Q0lEPC90ZD5cbiAgICA8L3RyPlxuICAgIDx0ciBpZD1cInZhbHVlXCI+XG4gICAgICA8dGQ+JHtjYXJyaWVyLm9yZGVyTnVtYmVyID8gY2Fycmllci5vcmRlck51bWJlci5zdWJzdHIoMCwgNCkgKyBcIi4uLlwiIDogXCJcIn08L3RkPlxuICAgICAgPHRkPiR7Y2Fycmllci5wcm9kdWN0ID8gY2Fycmllci5wcm9kdWN0IDogXCJcIn08L3RkPlxuICAgICAgPHRkPjA8L3RkPlxuICAgICAgPHRkPjA8L3RkPlxuICAgICAgPHRkPiR7Y2Fycmllci5pZH08L3RkPlxuICAgIDwvdHI+XG4gIDwvdGFibGU+XG4gIGA7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclN0YXRpb24oc3RhdGlvbikge1xuICByZXR1cm4gYFxuICA8dGFibGUgaWQ9XCJ0cmFuc1N0YXRpb25cIj5cbiAgICA8dHI+XG4gICAgICA8dGQ+XG4gICAgICAgICR7c3RhdGlvbi5pZH1cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgPC90YWJsZT5cbiAgYDtcbn1cblxuLy8gZXhwb3J0cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMucmVuZGVyUmVzb3VyY2UgPSByZW5kZXJSZXNvdXJjZTsgbW9kdWxlLmV4cG9ydHMucmVuZGVyVHJhbnNwb3J0ID0gcmVuZGVyVHJhbnNwb3J0OyBtb2R1bGUuZXhwb3J0cy5yZW5kZXJDYXJyaWVyID0gcmVuZGVyQ2FycmllcjsgbW9kdWxlLmV4cG9ydHMucmVuZGVyU3RhdGlvbiA9IHJlbmRlclN0YXRpb247Il19
