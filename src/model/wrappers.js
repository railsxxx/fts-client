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