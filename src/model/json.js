
let data;
/*
let init = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';
console.log(init);
data = JSON.parse(init);

*/
let werker = '{"Resources":[{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":1},{"TransportID":2,"Name":"FTS","StationID":1}],"ResourceID":1,"Name":"Werker1","Ready":true,"Busy":true,"Service":"Pfeife_Material"},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":2}],"ResourceID":2,"Name":"Müga","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":1,"Name":"SteinTransferband","StationID":3}],"ResourceID":3,"Name":"Laser","Ready":true,"Busy":false,"Service":null},{"ResTransports":[{"TransportID":2,"Name":"FTS","StationID":2}],"ResourceID":4,"Name":"Hermle","Ready":true,"Busy":false,"Service":null}],"Transports":[{"Carriers":[{"CarrierID":4,"OrderNumber":"218915A7-5769-4F52-96F5-5D0725D0A70F","Product":"Pfeife_Gravur","CurrentStationID":1,"DestinationStationID":1,"moving":false}],"TransportID":1,"Name":"SteinTransferband"},{"Carriers":[{"CarrierID":1,"OrderNumber":null,"Product":null,"CurrentStationID":0,"DestinationStationID":0,"moving":false}],"TransportID":2,"Name":"FTS"}]}';
console.log(werker);
data = JSON.parse(werker);

module.exports = data;

/*
console.log(data);

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
arr[0][0] = ""
for (c = 1; c < colCount; c++) {
  arr[c][0] = data.Transports[c - 1];
}

// Add a row for each resource
rowCount += resCount;
let res, resTrans;
for (r = 1; r < rowCount; r++) {
  res = data.Resources[r - 1];
  // add resource in first column
  arr[0][r] = res.Name;
  // Add stationID if any per transport column
  for (c = 1; c < colCount; c++) {
    resTrans = res.ResTransports;
    for (let t = 0; t < resTrans.length; t++) {
      if (arr[c][0].TransportID == resTrans[t].TransportID) {
        arr[c][r] = resTrans[t].StationID;
      } else {
        if (!arr[c][r]) arr[c][r] = "0";
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
  arr[0][r] = "";
  for (c = 1; c < colCount; c++) {
    transCars = arr[c][0].Carriers;
    arr[c][r] = transCars[t].CarrierID;
  }
  t++;
}

// Move carrier to resource station
let m = 0;
t = 0;
for (r = rowAfterResources; r < rowCount; r++) {
  for (c = 1; c < colCount; c++) {
    transCars = arr[c][0].Carriers;
    if (transCars[t].CurrentStationID != 0) {
      // set stationID of carrier home
      arr[c][r] = 0;
      // get row of current resource station
      for (m = 1; m < rowCount; m++) {
        if (arr[c][m] == transCars[t].CurrentStationID) break;
      }
      // move carrier to row of resource
      arr[c][m] = transCars[t].CarrierID;
    }
  }
  t++;
}

// Loop to display the elements of 2D array. 
let output = "";
for (r = 0; r < rowCount; r++) {
  for (c = 0; c < colCount; c++) {
    output += arr[c][r] + " ";
  }
  output += "\n";
}
console.log(output);

*/