const {
  patient: { search, get }
} = require("../../src/");

module.exports = async function testPatient() {
  const searchResult = await search({ q: "jones", includeDead: false });
  const patientResult = await get(searchResult[0].uuid, { v: "full" });
  console.log("TCL: testPatient -> result", patientResult);
  return patientResult.uuid;
};
