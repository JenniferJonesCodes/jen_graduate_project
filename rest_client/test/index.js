const session = require("./session");
const user = require("./user");
const patient = require("./patient");
const visit = require("./visit");

session()
  .then(() => user())
  .then(() => patient())
  .then(patientID => visit(patientID));
