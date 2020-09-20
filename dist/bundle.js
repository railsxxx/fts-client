(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fts = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const json = require('../model/data.js')
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

let dataMatrix;

function createTableView(data) {
  let tableData = matrix(data);
  dataMatrix = tableData;
  let tableHtml = tableView(tableData);
  // console.log("tableHtml: " + tableHtml);
  document.getElementById("app").innerHTML = tableHtml;
}


// exports #################################
// module.exports.createTable = createTable; 
module.exports.createTableAsync = createTableAsync;
module.exports.dataMatrix = dataMatrix;
},{"../model/data.js":4,"../model/matrix.js":5,"../view/tableView.js":8}],2:[function(require,module,exports){

const data = require('../model/data.js');
const getData = data.getData;

module.exports.handleClickBusy=function (cb, resID) {
  data.setBusyForID(cb.checked, resID);
  console.log(data.getData());
  alert(resID + " changed Busy to " + cb.checked);
}
module.exports.handleClickReady=function(cb, resID) {
  data.setReadyForID(cb.checked, resID);
  console.log(data.getData());
  alert(resID + " changed Ready to " + cb.checked);
}



},{"../model/data.js":4}],3:[function(require,module,exports){
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





},{"./controller/crud.js":1,"./controller/eventhandler.js":2}],4:[function(require,module,exports){

/*
let init = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';

let werker = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":true,"Service":"Pfeife_Material"},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":"218915A7-5769-4F52-96F5-5D0725D0A70F","Product":"Pfeife_Gravur","CurrentStationID":1,"DestinationStationID":1,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';

module.exports.fetchJson = function () {
  // console.log(werker);
  return JSON.parse(werker);
}
*/

module.exports.fetchJsonAsync = async function () {
  let url = './json/werker.json';
  // console.log('fetchJsonAsync');
  // console.log("url: " + url);
  const res = await fetch(url);
  // console.log(res);
  let dataRes = await res.json();
  data = dataRes;
  // console.log(json);
  return dataRes;
};

/*
const config = global.ftsConfig;
const server = config.server;
const apiRouteGet = config.apiRouteGet;

module.exports.fetchJsonAsync = async function () {
  // const url = 'https://WebApiPHP.rails.repl.co/webapi/Controller.php?action=get';
  const url = server + apiRouteGet;
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const res = await fetch(url, settings);
  console.log(res);
  let dataRes = await res.json();
  data = dataRes;
  console.log(dataRes);
  return dataRes;
};
  */


let data;

module.exports.getData = function () {
  if (!data) fetchJsonAsync();
  // console.log(data);
  return data;
}

module.exports.setBusyForID = function (busy, id) {
  let res = data.Resources.find(ele => ele.ResourceID == id);
  if (res) res.Busy = busy;
}
module.exports.setReadyForID = function (ready, id) {
  let res = data.Resources.find(ele => ele.ResourceID == id);
  res.Ready = ready;
}
// module.exports.getResourceForId(id){
//   foreach(res in data.Resources){
//     if (res.ResourceID == id) return res;
//   }
// }
},{}],5:[function(require,module,exports){
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

},{"./wrappers.js":6}],6:[function(require,module,exports){
const wrapperTemplate = require('../view/wrapperTemplate');

let renderResource = wrapperTemplate.renderResource;
let renderTransport = wrapperTemplate.renderTransport;
let renderCarrier = wrapperTemplate.renderCarrier;
let renderStation = wrapperTemplate.renderStation;

class Resource {
  constructor(_resource) {
    this.type = "Resource";
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
    this.type = "Transport";
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
    this.type = "Carrier";
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
    this.type = "Station";
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
},{"../view/wrapperTemplate":9}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{"./tableTemplate":7}],9:[function(require,module,exports){


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
    <tr id="value" class=${resource.service ? "active" : ""}>
      <td>${resource.name}</td>
      <td>1</td>
      <td>1</td>
      <td>
        <input type="checkbox" id="cb" ${resource.ready ? "checked" : ""} onclick="fts.handleClickReady(this, '${resource.id}');">
      </td>
      <td>
        <input type="checkbox" id="cb" ${resource.busy ? "checked" : ""} onclick="fts.handleClickBusy(this, '${resource.id}');">
      </td>
      <td>${resource.service ? resource.service : ""}</td>
    </tr>
  </table>
  `;
}

// , ${resource.name} onclick="handleClick(this, );"
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
    <tr id="value" class=${carrier.blink ? "blink" : (carrier.product ? "active" : "")}>
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
// module.exports.renderStation = handleClick;


},{}]},{},[3])(3)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udHJvbGxlci9jcnVkLmpzIiwic3JjL2NvbnRyb2xsZXIvZXZlbnRoYW5kbGVyLmpzIiwic3JjL21haW4uanMiLCJzcmMvbW9kZWwvZGF0YS5qcyIsInNyYy9tb2RlbC9tYXRyaXguanMiLCJzcmMvbW9kZWwvd3JhcHBlcnMuanMiLCJzcmMvdmlldy90YWJsZVRlbXBsYXRlLmpzIiwic3JjL3ZpZXcvdGFibGVWaWV3LmpzIiwic3JjL3ZpZXcvd3JhcHBlclRlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGpzb24gPSByZXF1aXJlKCcuLi9tb2RlbC9kYXRhLmpzJylcbmNvbnN0IG1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWwvbWF0cml4LmpzJyk7XG5jb25zdCB0YWJsZSA9IHJlcXVpcmUoJy4uL3ZpZXcvdGFibGVWaWV3LmpzJyk7XG5cbi8vIGxldCBmZXRjaEpzb24gPSBqc29uLmZldGNoSnNvbjtcbmxldCBmZXRjaEpzb25Bc3luYyA9IGpzb24uZmV0Y2hKc29uQXN5bmM7XG5sZXQgbWF0cml4ID0gbW9kZWwubWF0cml4O1xubGV0IHRhYmxlVmlldyA9IHRhYmxlLnRhYmxlVmlldztcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGFibGVBc3luYygpIHtcbiAgLy8gY29uc29sZS5sb2coXCJjcmVhdGVUYWJsZUFzeW5jXCIpO1xuICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoSnNvbkFzeW5jKCk7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICBjcmVhdGVUYWJsZVZpZXcoZGF0YSk7XG59XG5cbi8vIGZ1bmN0aW9uIGNyZWF0ZVRhYmxlKCkge1xuLy8gICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZVRhYmxlXCIpO1xuLy8gICBsZXQgZGF0YSA9IGZldGNoSnNvbigpO1xuLy8gICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgY3JlYXRlVGFibGVWaWV3KGRhdGEpO1xuLy8gfVxuXG5sZXQgZGF0YU1hdHJpeDtcblxuZnVuY3Rpb24gY3JlYXRlVGFibGVWaWV3KGRhdGEpIHtcbiAgbGV0IHRhYmxlRGF0YSA9IG1hdHJpeChkYXRhKTtcbiAgZGF0YU1hdHJpeCA9IHRhYmxlRGF0YTtcbiAgbGV0IHRhYmxlSHRtbCA9IHRhYmxlVmlldyh0YWJsZURhdGEpO1xuICAvLyBjb25zb2xlLmxvZyhcInRhYmxlSHRtbDogXCIgKyB0YWJsZUh0bWwpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKS5pbm5lckhUTUwgPSB0YWJsZUh0bWw7XG59XG5cblxuLy8gZXhwb3J0cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIG1vZHVsZS5leHBvcnRzLmNyZWF0ZVRhYmxlID0gY3JlYXRlVGFibGU7IFxubW9kdWxlLmV4cG9ydHMuY3JlYXRlVGFibGVBc3luYyA9IGNyZWF0ZVRhYmxlQXN5bmM7XG5tb2R1bGUuZXhwb3J0cy5kYXRhTWF0cml4ID0gZGF0YU1hdHJpeDsiLCJcbmNvbnN0IGRhdGEgPSByZXF1aXJlKCcuLi9tb2RlbC9kYXRhLmpzJyk7XG5jb25zdCBnZXREYXRhID0gZGF0YS5nZXREYXRhO1xuXG5tb2R1bGUuZXhwb3J0cy5oYW5kbGVDbGlja0J1c3k9ZnVuY3Rpb24gKGNiLCByZXNJRCkge1xuICBkYXRhLnNldEJ1c3lGb3JJRChjYi5jaGVja2VkLCByZXNJRCk7XG4gIGNvbnNvbGUubG9nKGRhdGEuZ2V0RGF0YSgpKTtcbiAgYWxlcnQocmVzSUQgKyBcIiBjaGFuZ2VkIEJ1c3kgdG8gXCIgKyBjYi5jaGVja2VkKTtcbn1cbm1vZHVsZS5leHBvcnRzLmhhbmRsZUNsaWNrUmVhZHk9ZnVuY3Rpb24oY2IsIHJlc0lEKSB7XG4gIGRhdGEuc2V0UmVhZHlGb3JJRChjYi5jaGVja2VkLCByZXNJRCk7XG4gIGNvbnNvbGUubG9nKGRhdGEuZ2V0RGF0YSgpKTtcbiAgYWxlcnQocmVzSUQgKyBcIiBjaGFuZ2VkIFJlYWR5IHRvIFwiICsgY2IuY2hlY2tlZCk7XG59XG5cblxuIiwiLy8gbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L2Jpbi9jbWQuanMgc3JjL21haW4uanMgLWQgLW8gZGlzdC9idW5kbGUuanMgLXZcbi8vIG5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2Jpbi9jbWQuanMgc3JjL21haW4uanMgLXMgZnRzIC1vIGRpc3QvYnVuZGxlLmpzIC1kXG5cblxuXG5jb25zdCBjb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL2NydWQuanMnKTtcblxuXG4vLyBjb25zdCBjcmVhdGVUYWJsZSA9IGNvbnRyb2xsZXIuY3JlYXRlVGFibGU7XG5jb25zdCBjcmVhdGVUYWJsZUFzeW5jID0gY29udHJvbGxlci5jcmVhdGVUYWJsZUFzeW5jO1xuXG4vLyBjcmVhdGVUYWJsZSgpO1xuXG5jcmVhdGVUYWJsZUFzeW5jKCk7XG5cbmNvbnNvbGUubG9nKFwibWFpbi5qc1wiKTtcblxuLy8gZXhwb3J0IGV2ZW50aGFuZGxlciB0byBicm93c2VyaWZ5IC0tc3RhbmRhbG9uZSBmdHMgb2JqZWN0IFxuY29uc3QgZXZlbnRoYW5kbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL2V2ZW50aGFuZGxlci5qcycpO1xubW9kdWxlLmV4cG9ydHMuaGFuZGxlQ2xpY2tCdXN5ID0gZXZlbnRoYW5kbGVyLmhhbmRsZUNsaWNrQnVzeTtcbm1vZHVsZS5leHBvcnRzLmhhbmRsZUNsaWNrUmVhZHkgPSBldmVudGhhbmRsZXIuaGFuZGxlQ2xpY2tSZWFkeTtcbi8vIGdsb2JhbC5oYW5kbGVDbGlja0J1c3kgPSBldmVudGhhbmRsZXIuaGFuZGxlQ2xpY2tCdXN5O1xuLy8gZ2xvYmFsLmhhbmRsZUNsaWNrUmVhZHkgPSBldmVudGhhbmRsZXIuaGFuZGxlQ2xpY2tSZWFkeTtcblxuXG5cblxuIiwiXG4vKlxubGV0IGluaXQgPSAne1wiUmVzb3VyY2VzXCI6W3tcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjF9LHtcIlRyYW5zcG9ydElEXCI6MixcIk5hbWVcIjpcIkZUU1wiLFwiU3RhdGlvbklEXCI6MX1dLFwiUmVzb3VyY2VJRFwiOjEsXCJOYW1lXCI6XCJXZXJrZXIxXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH0se1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjEsXCJOYW1lXCI6XCJTdGVpblRyYW5zZmVyYmFuZFwiLFwiU3RhdGlvbklEXCI6Mn1dLFwiUmVzb3VyY2VJRFwiOjIsXCJOYW1lXCI6XCJNw7xnYVwiLFwiUmVhZHlcIjp0cnVlLFwiQnVzeVwiOmZhbHNlLFwiU2VydmljZVwiOm51bGx9LHtcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjN9XSxcIlJlc291cmNlSURcIjozLFwiTmFtZVwiOlwiTGFzZXJcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjpmYWxzZSxcIlNlcnZpY2VcIjpudWxsfSx7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MixcIk5hbWVcIjpcIkZUU1wiLFwiU3RhdGlvbklEXCI6Mn1dLFwiUmVzb3VyY2VJRFwiOjQsXCJOYW1lXCI6XCJIZXJtbGVcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjpmYWxzZSxcIlNlcnZpY2VcIjpudWxsfV0sXCJUcmFuc3BvcnRzXCI6W3tcIkNhcnJpZXJzXCI6W3tcIkNhcnJpZXJJRFwiOjQsXCJPcmRlck51bWJlclwiOm51bGwsXCJQcm9kdWN0XCI6bnVsbCxcIkN1cnJlbnRTdGF0aW9uSURcIjowLFwiRGVzdGluYXRpb25TdGF0aW9uSURcIjowLFwibW92aW5nXCI6ZmFsc2V9XSxcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCJ9LHtcIkNhcnJpZXJzXCI6W3tcIkNhcnJpZXJJRFwiOjEsXCJPcmRlck51bWJlclwiOm51bGwsXCJQcm9kdWN0XCI6bnVsbCxcIkN1cnJlbnRTdGF0aW9uSURcIjowLFwiRGVzdGluYXRpb25TdGF0aW9uSURcIjowLFwibW92aW5nXCI6ZmFsc2V9XSxcIlRyYW5zcG9ydElEXCI6MixcIk5hbWVcIjpcIkZUU1wifV19JztcblxubGV0IHdlcmtlciA9ICd7XCJSZXNvdXJjZXNcIjpbe1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjEsXCJOYW1lXCI6XCJTdGVpblRyYW5zZmVyYmFuZFwiLFwiU3RhdGlvbklEXCI6MX0se1wiVHJhbnNwb3J0SURcIjoyLFwiTmFtZVwiOlwiRlRTXCIsXCJTdGF0aW9uSURcIjoxfV0sXCJSZXNvdXJjZUlEXCI6MSxcIk5hbWVcIjpcIldlcmtlcjFcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjp0cnVlLFwiU2VydmljZVwiOlwiUGZlaWZlX01hdGVyaWFsXCJ9LHtcIlJlc1RyYW5zcG9ydHNcIjpbe1wiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjoyLFwiTmFtZVwiOlwiTcO8Z2FcIixcIlJlYWR5XCI6dHJ1ZSxcIkJ1c3lcIjpmYWxzZSxcIlNlcnZpY2VcIjpudWxsfSx7XCJSZXNUcmFuc3BvcnRzXCI6W3tcIlRyYW5zcG9ydElEXCI6MSxcIk5hbWVcIjpcIlN0ZWluVHJhbnNmZXJiYW5kXCIsXCJTdGF0aW9uSURcIjozfV0sXCJSZXNvdXJjZUlEXCI6MyxcIk5hbWVcIjpcIkxhc2VyXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH0se1wiUmVzVHJhbnNwb3J0c1wiOlt7XCJUcmFuc3BvcnRJRFwiOjIsXCJOYW1lXCI6XCJGVFNcIixcIlN0YXRpb25JRFwiOjJ9XSxcIlJlc291cmNlSURcIjo0LFwiTmFtZVwiOlwiSGVybWxlXCIsXCJSZWFkeVwiOnRydWUsXCJCdXN5XCI6ZmFsc2UsXCJTZXJ2aWNlXCI6bnVsbH1dLFwiVHJhbnNwb3J0c1wiOlt7XCJDYXJyaWVyc1wiOlt7XCJDYXJyaWVySURcIjo0LFwiT3JkZXJOdW1iZXJcIjpcIjIxODkxNUE3LTU3NjktNEY1Mi05NkY1LTVEMDcyNUQwQTcwRlwiLFwiUHJvZHVjdFwiOlwiUGZlaWZlX0dyYXZ1clwiLFwiQ3VycmVudFN0YXRpb25JRFwiOjEsXCJEZXN0aW5hdGlvblN0YXRpb25JRFwiOjEsXCJtb3ZpbmdcIjpmYWxzZX1dLFwiVHJhbnNwb3J0SURcIjoxLFwiTmFtZVwiOlwiU3RlaW5UcmFuc2ZlcmJhbmRcIn0se1wiQ2FycmllcnNcIjpbe1wiQ2FycmllcklEXCI6MSxcIk9yZGVyTnVtYmVyXCI6bnVsbCxcIlByb2R1Y3RcIjpudWxsLFwiQ3VycmVudFN0YXRpb25JRFwiOjAsXCJEZXN0aW5hdGlvblN0YXRpb25JRFwiOjAsXCJtb3ZpbmdcIjpmYWxzZX1dLFwiVHJhbnNwb3J0SURcIjoyLFwiTmFtZVwiOlwiRlRTXCJ9XX0nO1xuXG5tb2R1bGUuZXhwb3J0cy5mZXRjaEpzb24gPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGNvbnNvbGUubG9nKHdlcmtlcik7XG4gIHJldHVybiBKU09OLnBhcnNlKHdlcmtlcik7XG59XG4qL1xuXG5tb2R1bGUuZXhwb3J0cy5mZXRjaEpzb25Bc3luYyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHVybCA9ICcuL2pzb24vd2Vya2VyLmpzb24nO1xuICAvLyBjb25zb2xlLmxvZygnZmV0Y2hKc29uQXN5bmMnKTtcbiAgLy8gY29uc29sZS5sb2coXCJ1cmw6IFwiICsgdXJsKTtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgbGV0IGRhdGFSZXMgPSBhd2FpdCByZXMuanNvbigpO1xuICBkYXRhID0gZGF0YVJlcztcbiAgLy8gY29uc29sZS5sb2coanNvbik7XG4gIHJldHVybiBkYXRhUmVzO1xufTtcblxuLypcbmNvbnN0IGNvbmZpZyA9IGdsb2JhbC5mdHNDb25maWc7XG5jb25zdCBzZXJ2ZXIgPSBjb25maWcuc2VydmVyO1xuY29uc3QgYXBpUm91dGVHZXQgPSBjb25maWcuYXBpUm91dGVHZXQ7XG5cbm1vZHVsZS5leHBvcnRzLmZldGNoSnNvbkFzeW5jID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAvLyBjb25zdCB1cmwgPSAnaHR0cHM6Ly9XZWJBcGlQSFAucmFpbHMucmVwbC5jby93ZWJhcGkvQ29udHJvbGxlci5waHA/YWN0aW9uPWdldCc7XG4gIGNvbnN0IHVybCA9IHNlcnZlciArIGFwaVJvdXRlR2V0O1xuICBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgc2V0dGluZ3MpO1xuICBjb25zb2xlLmxvZyhyZXMpO1xuICBsZXQgZGF0YVJlcyA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGRhdGEgPSBkYXRhUmVzO1xuICBjb25zb2xlLmxvZyhkYXRhUmVzKTtcbiAgcmV0dXJuIGRhdGFSZXM7XG59O1xuICAqL1xuXG5cbmxldCBkYXRhO1xuXG5tb2R1bGUuZXhwb3J0cy5nZXREYXRhID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIWRhdGEpIGZldGNoSnNvbkFzeW5jKCk7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICByZXR1cm4gZGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMuc2V0QnVzeUZvcklEID0gZnVuY3Rpb24gKGJ1c3ksIGlkKSB7XG4gIGxldCByZXMgPSBkYXRhLlJlc291cmNlcy5maW5kKGVsZSA9PiBlbGUuUmVzb3VyY2VJRCA9PSBpZCk7XG4gIGlmIChyZXMpIHJlcy5CdXN5ID0gYnVzeTtcbn1cbm1vZHVsZS5leHBvcnRzLnNldFJlYWR5Rm9ySUQgPSBmdW5jdGlvbiAocmVhZHksIGlkKSB7XG4gIGxldCByZXMgPSBkYXRhLlJlc291cmNlcy5maW5kKGVsZSA9PiBlbGUuUmVzb3VyY2VJRCA9PSBpZCk7XG4gIHJlcy5SZWFkeSA9IHJlYWR5O1xufVxuLy8gbW9kdWxlLmV4cG9ydHMuZ2V0UmVzb3VyY2VGb3JJZChpZCl7XG4vLyAgIGZvcmVhY2gocmVzIGluIGRhdGEuUmVzb3VyY2VzKXtcbi8vICAgICBpZiAocmVzLlJlc291cmNlSUQgPT0gaWQpIHJldHVybiByZXM7XG4vLyAgIH1cbi8vIH0iLCJjb25zdCB3cmFwcGVycyA9IHJlcXVpcmUoJy4vd3JhcHBlcnMuanMnKTtcblxubGV0IFJlc291cmNlID0gd3JhcHBlcnMuUmVzb3VyY2U7XG5sZXQgVHJhbnNwb3J0ID0gd3JhcHBlcnMuVHJhbnNwb3J0O1xubGV0IENhcnJpZXIgPSB3cmFwcGVycy5DYXJyaWVyO1xubGV0IFN0YXRpb24gPSB3cmFwcGVycy5TdGF0aW9uO1xuXG5mdW5jdGlvbiBtYXRyaXgoZGF0YSkge1xuXG4gIC8vIGNvbnNvbGUubG9nKFwibWF0cml4LmpzXCIpO1xuICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcblxuICBsZXQgdHJhbnNDb3VudCA9IGRhdGEuVHJhbnNwb3J0cy5sZW5ndGg7XG4gIGxldCByZXNDb3VudCA9IGRhdGEuUmVzb3VyY2VzLmxlbmd0aDtcblxuICAvLyBDcmVhdGUgYXJyYXkgY29sdW1uc1xuICBsZXQgY29sQ291bnQgPSB0cmFuc0NvdW50ICsgMTtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShjb2xDb3VudCk7XG4gIGxldCBjID0gMDsgLy8gY29sdW1uc1xuICBsZXQgciA9IDA7IC8vIHJvd3NcblxuICAvLyBBZGQgZW1wdHkgcm93IGFycmF5IGZvciBlYWNoIGNvbHVtblxuICBsZXQgcm93Q291bnQgPSAwO1xuICBmb3IgKGMgPSAwOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgIGFycltjXSA9IFtdO1xuICB9XG5cbiAgLy8gYWRkIHJvdyBvZiBjb2x1bW4gaGVhZGVyXG4gIHJvd0NvdW50ID0gMTtcbiAgYXJyWzBdWzBdID0gbnVsbDtcbiAgZm9yIChjID0gMTsgYyA8IGNvbENvdW50OyBjKyspIHtcbiAgICAvLyBhcnJbY11bMF0gPSBkYXRhLlRyYW5zcG9ydHNbYyAtIDFdO1xuICAgIGFycltjXVswXSA9IG5ldyBUcmFuc3BvcnQoZGF0YS5UcmFuc3BvcnRzW2MgLSAxXSk7XG4gIH1cblxuICAvLyBBZGQgYSByb3cgZm9yIGVhY2ggcmVzb3VyY2VcbiAgcm93Q291bnQgKz0gcmVzQ291bnQ7XG4gIGxldCByZXMsIHJlc1RyYW5zO1xuICBmb3IgKHIgPSAxOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgIHJlcyA9IGRhdGEuUmVzb3VyY2VzW3IgLSAxXTtcbiAgICAvLyBhZGQgcmVzb3VyY2UgaW4gZmlyc3QgY29sdW1uXG4gICAgYXJyWzBdW3JdID0gbmV3IFJlc291cmNlKHJlcyk7XG4gICAgLy8gQWRkIHN0YXRpb25JRCBpZiBhbnkgcGVyIHRyYW5zcG9ydCBjb2x1bW5cbiAgICBmb3IgKGMgPSAxOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgICAgcmVzVHJhbnMgPSByZXMuUmVzVHJhbnNwb3J0cztcbiAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgcmVzVHJhbnMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyOiBcIiArIHIgKyBcIiwgYzogXCIgKyBjICsgXCIsIGFycltjXVswXS50cmFuc3BvcnRJRDogXCIgKyBhcnJbY11bMF0udHJhbnNwb3J0SUQgKyBcIiwgcmVzVHJhbnNbdF0uVHJhbnNwb3J0SUQ6IFwiICsgcmVzVHJhbnNbdF0uVHJhbnNwb3J0SUQpO1xuICAgICAgICBpZiAoYXJyW2NdWzBdLmlkID09IHJlc1RyYW5zW3RdLlRyYW5zcG9ydElEKSB7XG4gICAgICAgICAgYXJyW2NdW3JdID0gbmV3IFN0YXRpb24ocmVzVHJhbnNbdF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycltjXVtyXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYSByb3cgZm9yIGVhY2ggdHJhbnNwb3J0IGNhcnJpZXJcbiAgbGV0IG1heENhcnJpZXJDb3VudCA9IDA7XG4gIGZvciAobGV0IHQgPSAwOyB0IDwgdHJhbnNDb3VudDsgdCsrKSB7XG4gICAgaWYgKG1heENhcnJpZXJDb3VudCA8IGRhdGEuVHJhbnNwb3J0c1t0XS5DYXJyaWVycy5sZW5ndGgpIG1heENhcnJpZXJDb3VudCA9IGRhdGEuVHJhbnNwb3J0c1t0XS5DYXJyaWVycy5sZW5ndGhcbiAgfVxuICBsZXQgcm93QWZ0ZXJSZXNvdXJjZXMgPSByb3dDb3VudDtcbiAgcm93Q291bnQgKz0gbWF4Q2FycmllckNvdW50O1xuICBsZXQgdHJhbnNDYXJzLCB0ID0gMDtcbiAgZm9yIChyID0gcm93QWZ0ZXJSZXNvdXJjZXM7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgYXJyWzBdW3JdID0gbnVsbDtcbiAgICBmb3IgKGMgPSAxOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgICAgdHJhbnNDYXJzID0gYXJyW2NdWzBdLmNhcnJpZXJzO1xuICAgICAgYXJyW2NdW3JdID0gKG5ldyBDYXJyaWVyKHRyYW5zQ2Fyc1t0XSkuc2V0SG9tZShjLCByKSk7XG4gICAgfVxuICAgIHQrKztcbiAgfVxuXG4gIC8vIE1vdmUgY2FycmllciB0byByZXNvdXJjZSBzdGF0aW9uXG4gIGxldCBtID0gMDtcbiAgZm9yIChyID0gcm93QWZ0ZXJSZXNvdXJjZXM7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgZm9yIChjID0gMTsgYyA8IGNvbENvdW50OyBjKyspIHtcbiAgICAgIC8vIHRyYW5zQ2FycyA9IGFycltjXVswXS5jYXJyaWVycztcbiAgICAgIHRyYW5zQ2FycyA9IGFycltjXVtyXTtcbiAgICAgIGlmICh0cmFuc0NhcnMuY3VycmVudFN0YXRpb25JRCAhPSAwKSB7XG4gICAgICAgIC8vIGNsZWFyIGNhcnJpZXIgaG9tZSBjZWxsXG4gICAgICAgIGFycltjXVtyXSA9IG51bGw7XG4gICAgICAgIC8vIGdldCByb3cgb2YgY3VycmVudCByZXNvdXJjZSBzdGF0aW9uXG4gICAgICAgIGZvciAobSA9IDE7IG0gPCByb3dDb3VudDsgbSsrKSB7XG4gICAgICAgICAgaWYgKGFycltjXVttXS5pZCA9PSB0cmFuc0NhcnMuY3VycmVudFN0YXRpb25JRCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbW92ZSBjYXJyaWVyIHRvIHJvdyBvZiByZXNvdXJjZVxuICAgICAgICBhcnJbY11bbV0gPSB0cmFuc0NhcnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTG9vcCB0byBkaXNwbGF5IHRoZSBlbGVtZW50cyBvZiAyRCBhcnJheS4gXG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuICBmb3IgKHIgPSAwOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgIGZvciAoYyA9IDA7IGMgPCBjb2xDb3VudDsgYysrKSB7XG4gICAgICBpZiAoYXJyW2NdW3JdKVxuICAgICAgICBvdXRwdXQgKz0gKGFycltjXVtyXSkubmFtZSArIFwiIFwiO1xuICAgICAgZWxzZSBvdXRwdXQgKz0gXCJudWxsIFwiO1xuICAgIH1cbiAgICBvdXRwdXQgKz0gXCJcXG5cIjtcbiAgfVxuICAvLyBjb25zb2xlLmxvZyhvdXRwdXQpO1xuICAvLyBjb25zb2xlLmxvZyhhcnIpO1xuICByZXR1cm4gYXJyO1xufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMubWF0cml4ID0gbWF0cml4O1xuIiwiY29uc3Qgd3JhcHBlclRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdmlldy93cmFwcGVyVGVtcGxhdGUnKTtcblxubGV0IHJlbmRlclJlc291cmNlID0gd3JhcHBlclRlbXBsYXRlLnJlbmRlclJlc291cmNlO1xubGV0IHJlbmRlclRyYW5zcG9ydCA9IHdyYXBwZXJUZW1wbGF0ZS5yZW5kZXJUcmFuc3BvcnQ7XG5sZXQgcmVuZGVyQ2FycmllciA9IHdyYXBwZXJUZW1wbGF0ZS5yZW5kZXJDYXJyaWVyO1xubGV0IHJlbmRlclN0YXRpb24gPSB3cmFwcGVyVGVtcGxhdGUucmVuZGVyU3RhdGlvbjtcblxuY2xhc3MgUmVzb3VyY2Uge1xuICBjb25zdHJ1Y3RvcihfcmVzb3VyY2UpIHtcbiAgICB0aGlzLnR5cGUgPSBcIlJlc291cmNlXCI7XG4gICAgdGhpcy5yZXNvdXJjZSA9IF9yZXNvdXJjZTtcbiAgfVxuXG4gIGdldCBpZCgpIHsgcmV0dXJuIHRoaXMucmVzb3VyY2UuUmVzb3VyY2VJRDsgfVxuICBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMucmVzb3VyY2UuTmFtZTsgfVxuICBnZXQgcmVhZHkoKSB7IHJldHVybiB0aGlzLnJlc291cmNlLlJlYWR5OyB9XG4gIGdldCBidXN5KCkgeyByZXR1cm4gdGhpcy5yZXNvdXJjZS5CdXN5OyB9XG4gIGdldCBzZXJ2aWNlKCkgeyByZXR1cm4gdGhpcy5yZXNvdXJjZS5TZXJ2aWNlOyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiByZW5kZXJSZXNvdXJjZSh0aGlzKTtcbiAgfVxufVxuXG5jbGFzcyBUcmFuc3BvcnQge1xuICBjb25zdHJ1Y3RvcihfdHJhbnNwb3J0KSB7XG4gICAgdGhpcy50eXBlID0gXCJUcmFuc3BvcnRcIjtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IF90cmFuc3BvcnQ7XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLnRyYW5zcG9ydC5UcmFuc3BvcnRJRDsgfVxuICBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMudHJhbnNwb3J0Lk5hbWU7IH1cbiAgZ2V0IGNhcnJpZXJzKCkgeyByZXR1cm4gdGhpcy50cmFuc3BvcnQuQ2FycmllcnM7IH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHJlbmRlclRyYW5zcG9ydCh0aGlzKTtcbiAgfVxufVxuXG5jbGFzcyBDYXJyaWVyIHtcbiAgY29uc3RydWN0b3IoX2NhcnJpZXIpIHtcbiAgICB0aGlzLnR5cGUgPSBcIkNhcnJpZXJcIjtcbiAgICB0aGlzLmNhcnJpZXIgPSBfY2FycmllcjtcbiAgICB0aGlzLmhvbWUgPSB7IGNvbDogMCwgcm93OiAwIH07XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLmNhcnJpZXIuQ2FycmllcklEOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gXCJjYXJfXCIgKyB0aGlzLmlkOyB9XG4gIGdldCBvcmRlck51bWJlcigpIHsgcmV0dXJuIHRoaXMuY2Fycmllci5PcmRlck51bWJlcjsgfVxuICBnZXQgcHJvZHVjdCgpIHsgcmV0dXJuIHRoaXMuY2Fycmllci5Qcm9kdWN0OyB9XG4gIGdldCBjdXJyZW50U3RhdGlvbklEKCkgeyByZXR1cm4gdGhpcy5jYXJyaWVyLkN1cnJlbnRTdGF0aW9uSUQ7IH1cbiAgZ2V0IGRlc3RpbmF0aW9uU3RhdGlvbklEKCkgeyByZXR1cm4gdGhpcy5jYXJyaWVyLkRlc3RpbmF0aW9uU3RhdGlvbklEOyB9XG4gIGdldCBtb3ZpbmcoKSB7IHJldHVybiB0aGlzLmNhcnJpZXIubW92aW5nOyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiByZW5kZXJDYXJyaWVyKHRoaXMpO1xuICB9XG5cbiAgc2V0SG9tZShjLCByKSB7XG4gICAgdGhpcy5ob21lLmNvbCA9IGM7XG4gICAgdGhpcy5ob21lLnJvdyA9IHI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuY2xhc3MgU3RhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKF9zdGF0aW9uKSB7XG4gICAgdGhpcy50eXBlID0gXCJTdGF0aW9uXCI7XG4gICAgdGhpcy5zdGF0aW9uID0gX3N0YXRpb247XG4gIH1cblxuICBnZXQgaWQoKSB7IHJldHVybiB0aGlzLnN0YXRpb24uU3RhdGlvbklEOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gXCJzdGF0X1wiICsgdGhpcy5pZDsgfVxuICBnZXQgdHJhbnNwb3J0SUQoKSB7IHJldHVybiB0aGlzLnN0YXRpb24uVHJhbnNwb3J0SUQ7IH1cbiAgZ2V0IHRyYW5zcG9ydE5hbWUoKSB7IHJldHVybiB0aGlzLnN0YXRpb24uTmFtZTsgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gcmVuZGVyU3RhdGlvbih0aGlzKTtcbiAgfVxufVxuXG4vLyBleHBvcnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5tb2R1bGUuZXhwb3J0cy5SZXNvdXJjZSA9IFJlc291cmNlO1xubW9kdWxlLmV4cG9ydHMuVHJhbnNwb3J0ID0gVHJhbnNwb3J0O1xubW9kdWxlLmV4cG9ydHMuQ2FycmllciA9IENhcnJpZXI7XG5tb2R1bGUuZXhwb3J0cy5TdGF0aW9uID0gU3RhdGlvbjsiLCIvL2h0dHBzOi8vd2VzYm9zLmNvbS90ZW1wbGF0ZS1zdHJpbmdzLWh0bWwvXG5cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihyb3dzKXtcbiAgbGV0IGhlYWRlciA9IFtcIlJlc291cmNlXCJdO1xuICBmb3IgKGxldCBjID0gMTsgYyA8IHJvd3NbMF0ubGVuZ3RoOyBjKyspIHtcbiAgICBoZWFkZXIucHVzaChcIlRyYW5zcG9ydFwiKTtcbiAgfVxuICByZXR1cm4gaGVhZGVyLm1hcChoZWFkID0+IGBcbiAgPHRoPlxuICAgICR7aGVhZH1cbiAgPC90aD5cbiAgYCkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclJvdyhjZWxscykge1xuICByZXR1cm4gY2VsbHMubWFwKGNlbGwgPT4gYFxuICA8dGQ+XG4gICAgJHtjZWxsICE9IFwibnVsbFwiID8gYCR7Y2VsbC5yZW5kZXIoKX1gIDogJyd9XG4gIDwvdGQ+XG4gIGApLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYWJsZShyb3dzKSB7XG4gIHJldHVybiBgXG5cdDx0YWJsZSBzdHlsZT1cIndpZHRoOjEwMCVcIj5cbiAgICA8dHI+XG4gICAgICAke3JlbmRlckhlYWRlcihyb3dzKX1cbiAgICA8L3RyPlxuICAgICR7cm93cy5tYXAocm93ID0+IGBcbiAgICA8dHI+XG4gICAgICAke3JlbmRlclJvdyhyb3cpfVxuICAgIDwvdHI+XG4gICAgYCkuam9pbignJyl9XG5cdDwvdGFibGU+XG4gIGA7XG59XG5cbi8vIGV4b3J0cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cy5yZW5kZXJUYWJsZSA9IHJlbmRlclRhYmxlOyIsImNvbnN0IHRhYmxlVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RhYmxlVGVtcGxhdGUnKVxuXG5jb25zdCByZW5kZXJUYWJsZSA9IHRhYmxlVGVtcGxhdGUucmVuZGVyVGFibGU7XG5cbmZ1bmN0aW9uIHRhYmxlVmlldyhtYXRyaXgpIHtcblxuICAvLyBjb25zb2xlLmxvZyhcInRhYmxlVmlldy5qc1wiKTtcbiAgLy8gY29uc29sZS5sb2cobWF0cml4KTtcbiAgbGV0IGNvbENvdW50ID0gbWF0cml4Lmxlbmd0aDtcbiAgbGV0IHJvd0NvdW50ID0gbWF0cml4WzBdLmxlbmd0aDtcbiAgLy8gY29uc29sZS5sb2coXCJjb2xDb3VudDogXCIgKyBjb2xDb3VudCArIFwiLCByb3dDb3VudDogXCIgKyByb3dDb3VudClcbiAgbGV0IHJvd3MgPSBbXTtcbiAgbGV0IGNlbGxzID0gW107XG4gIGZvciAobGV0IHIgPSAwOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY29sQ291bnQ7IGMrKykge1xuICAgICAgaWYgKG1hdHJpeFtjXVtyXSlcbiAgICAgICAgY2VsbHMucHVzaChtYXRyaXhbY11bcl0pO1xuICAgICAgZWxzZSBjZWxscy5wdXNoKFwibnVsbFwiKTtcbiAgICB9XG4gICAgc2V0QmxpbmsoY2VsbHMpO1xuICAgIHJvd3MucHVzaChjZWxscyk7XG4gICAgY2VsbHMgPSBbXTtcbiAgfVxuICAvLyBjb25zb2xlLmxvZyhyb3dzKTtcbiAgbGV0IHJlbmRlcmVkID0gcmVuZGVyVGFibGUocm93cyk7XG4gIC8vIGNvbnNvbGUubG9nKFwicmVuZGVyZWQ6IFwiICsgcmVuZGVyZWQpO1xuICByZXR1cm4gcmVuZGVyZWQ7XG59XG5cbmZ1bmN0aW9uIHNldEJsaW5rKGNlbGxzKSB7XG4gIGZvciAobGV0IGMgPSAxOyBjIDwgY2VsbHMubGVuZ3RoOyBjKyspIHtcbiAgICBpZiAoY2VsbHNbMF0gPT0gXCJudWxsXCIgJiYgY2VsbHNbY10gIT0gXCJudWxsXCIgJiYgKGNlbGxzW2NdKS50eXBlID09IFwiQ2FycmllclwiICYmIChjZWxsc1tjXSkub3JkZXJOdW1iZXIpIHtcbiAgICAgIGNlbGxzW2NdLmJsaW5rID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuLy8gZXhwb3J0cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cy50YWJsZVZpZXcgPSB0YWJsZVZpZXc7IiwiXG5cbmZ1bmN0aW9uIHJlbmRlclJlc291cmNlKHJlc291cmNlKSB7XG4gIHJldHVybiBgXG4gIDx0YWJsZSBpZD1cInJlc1wiPlxuICAgIDx0cj5cbiAgICAgIDx0ZCBpZD1cInJlc05hbWVcIj5OYW1lPC90ZD5cbiAgICAgIDx0ZCBpZD1cInJlc0Nvc3RcIj5Db3N0PC90ZD5cbiAgICAgIDx0ZCBpZD1cInJlc1RpbWVcIj5UaW1lPC90ZD5cbiAgICAgIDx0ZCBpZD1cInJlc1JlYWR5XCI+UjwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNCdXN5XCI+QjwvdGQ+XG4gICAgICA8dGQgaWQ9XCJyZXNTZXJ2aWNlXCI+U2VydmljZTwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgaWQ9XCJ2YWx1ZVwiIGNsYXNzPSR7cmVzb3VyY2Uuc2VydmljZSA/IFwiYWN0aXZlXCIgOiBcIlwifT5cbiAgICAgIDx0ZD4ke3Jlc291cmNlLm5hbWV9PC90ZD5cbiAgICAgIDx0ZD4xPC90ZD5cbiAgICAgIDx0ZD4xPC90ZD5cbiAgICAgIDx0ZD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JcIiAke3Jlc291cmNlLnJlYWR5ID8gXCJjaGVja2VkXCIgOiBcIlwifSBvbmNsaWNrPVwiZnRzLmhhbmRsZUNsaWNrUmVhZHkodGhpcywgJyR7cmVzb3VyY2UuaWR9Jyk7XCI+XG4gICAgICA8L3RkPlxuICAgICAgPHRkPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYlwiICR7cmVzb3VyY2UuYnVzeSA/IFwiY2hlY2tlZFwiIDogXCJcIn0gb25jbGljaz1cImZ0cy5oYW5kbGVDbGlja0J1c3kodGhpcywgJyR7cmVzb3VyY2UuaWR9Jyk7XCI+XG4gICAgICA8L3RkPlxuICAgICAgPHRkPiR7cmVzb3VyY2Uuc2VydmljZSA/IHJlc291cmNlLnNlcnZpY2UgOiBcIlwifTwvdGQ+XG4gICAgPC90cj5cbiAgPC90YWJsZT5cbiAgYDtcbn1cblxuLy8gLCAke3Jlc291cmNlLm5hbWV9IG9uY2xpY2s9XCJoYW5kbGVDbGljayh0aGlzLCApO1wiXG5mdW5jdGlvbiByZW5kZXJUcmFuc3BvcnQodHJhbnNwb3J0KSB7XG4gIHJldHVybiB0cmFuc3BvcnQubmFtZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FycmllcihjYXJyaWVyKSB7XG4gIHJldHVybiBgXG4gIDx0YWJsZT5cbiAgICA8dHI+XG4gICAgICA8dGQ+TnI8L3RkPlxuICAgICAgPHRkPlByb2R1Y3Q8L3RkPlxuICAgICAgPHRkPkNvc3Q8L3RkPlxuICAgICAgPHRkPlRpbWU8L3RkPlxuICAgICAgPHRkPkNJRDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgaWQ9XCJ2YWx1ZVwiIGNsYXNzPSR7Y2Fycmllci5ibGluayA/IFwiYmxpbmtcIiA6IChjYXJyaWVyLnByb2R1Y3QgPyBcImFjdGl2ZVwiIDogXCJcIil9PlxuICAgICAgPHRkPiR7Y2Fycmllci5vcmRlck51bWJlciA/IGNhcnJpZXIub3JkZXJOdW1iZXIuc3Vic3RyKDAsIDQpICsgXCIuLi5cIiA6IFwiXCJ9PC90ZD5cbiAgICAgIDx0ZD4ke2NhcnJpZXIucHJvZHVjdCA/IGNhcnJpZXIucHJvZHVjdCA6IFwiXCJ9PC90ZD5cbiAgICAgIDx0ZD4wPC90ZD5cbiAgICAgIDx0ZD4wPC90ZD5cbiAgICAgIDx0ZD4ke2NhcnJpZXIuaWR9PC90ZD5cbiAgICA8L3RyPlxuICA8L3RhYmxlPlxuICBgO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTdGF0aW9uKHN0YXRpb24pIHtcbiAgcmV0dXJuIGBcbiAgPHRhYmxlIGlkPVwidHJhbnNTdGF0aW9uXCI+XG4gICAgPHRyPlxuICAgICAgPHRkPlxuICAgICAgICAke3N0YXRpb24uaWR9XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGFibGU+XG4gIGA7XG59XG5cbi8vIGV4cG9ydHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzLnJlbmRlclJlc291cmNlID0gcmVuZGVyUmVzb3VyY2U7IG1vZHVsZS5leHBvcnRzLnJlbmRlclRyYW5zcG9ydCA9IHJlbmRlclRyYW5zcG9ydDsgbW9kdWxlLmV4cG9ydHMucmVuZGVyQ2FycmllciA9IHJlbmRlckNhcnJpZXI7IG1vZHVsZS5leHBvcnRzLnJlbmRlclN0YXRpb24gPSByZW5kZXJTdGF0aW9uO1xuLy8gbW9kdWxlLmV4cG9ydHMucmVuZGVyU3RhdGlvbiA9IGhhbmRsZUNsaWNrO1xuXG4iXX0=
