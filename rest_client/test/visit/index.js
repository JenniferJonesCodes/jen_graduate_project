const util = require("util");
const {
  visit: { search, get }
} = require("../../src/");

//gets visit information using patientID
module.exports = async function testVisit(patientID) {
  const visitSearchResult = await search({ patient: patientID });
  console.log("TCL: testVisit -> visitSearchResult", visitSearchResult);
  const activeVisits = visitSearchResult.filter(
    visit => !Boolean(visit.stopDatetime)
  );
  console.log("TCL: testVisit -> activeVisits", activeVisits);
  const visitId = activeVisits[0] && activeVisits[0].uuid;
  if (visitId) {
    const visit = await get(visitId);
    console.log("TCL: testVisit -> visit", visit);
    return visit;
  }
  console.log("No active visits for patient ", patientID);
  return false;
};
