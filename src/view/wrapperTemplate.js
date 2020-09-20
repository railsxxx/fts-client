

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

