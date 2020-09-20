
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
