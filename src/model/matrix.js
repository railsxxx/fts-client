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
