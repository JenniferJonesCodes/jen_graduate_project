const util = require("util");
const {
  visit: { search, get }
} = require("../../src/");

//gets visit information using patientID
module.exports = async function testVisit(patientID) {
  const visitSearchResult = await search({ q: patientID });
  const visitId = visitSearchResult[0].uuid;
  const visit = await get(visitId);
  console.log("TCL: testVisit -> visit", visit);
  return visit;
};
