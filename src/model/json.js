
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


