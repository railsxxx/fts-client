
const data = require('../model/data.js');
const getData = data.getData;

module.exports.handleClickBusy=function (cb, resID) {
  data.setBusyForID(cb.checked, resID);
  // console.log(data.getData());
  // alert(resID + " changed Busy to " + cb.checked);
}
module.exports.handleClickReady=function(cb, resID) {
  data.setReadyForID(cb.checked, resID);
  // console.log(data.getData());
  // alert(resID + " changed Ready to " + cb.checked);
}


