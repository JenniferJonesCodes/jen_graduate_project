const session = require("./session");
const user = require("./user");
const patient = require("./patient");
const visit = require("./visit");
const encounter = require("./encounter");
const concept = require("./concept");

let conceptCache = {};
let patientIdCache = null;

session()
  .then(() => user())
  .then(() => patient())
  .then(patientID => {
    patientIdCache = patientID;
    return visit(patientID);
  })
  .then(() => concept())
  .then(conceptResult => {
    conceptCache = conceptResult;
    return Promise.resolve();
  })
  .then(() => encounter({ concepts: conceptCache, patientID: patientIdCache }));
