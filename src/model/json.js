
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

