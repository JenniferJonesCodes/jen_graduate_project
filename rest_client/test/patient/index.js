const {
  patient: { search, get }
} = require("../../src/");

module.exports = async function testPatient() {
  const searchName = "bob jones";
  const searchResult = await search({ q: searchName, includeDead: false });
  console.log("TCL: testPatient -> searchResult", searchResult);
  const patient = searchResult.find(entry =>
    entry.display.toLowerCase().includes(searchName)
  );
  console.log("TCL: testPatient -> patient", patient);
  if (!patient) {
    console.log("could not find patient with ", searchName, " in their name");
  }
  const patientResult = await get(patient.uuid, {
    v: "full"
  });
  console.log("TCL: testPatient -> result", patientResult);
  return patientResult.uuid;
};
