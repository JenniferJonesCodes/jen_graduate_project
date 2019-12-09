const client = require("../lib/client");

const defaultParams = {};

//search for a patient using name to get patient uuid
module.exports.search = async function searchPatients(params = {}) {
  try {
    const response = await client({
      url: "patient",
      params: {
        ...defaultParams,
        ...params
      }
    });

    console.log("TCL: searchPatients -> response.data", response.data);
    // filter out falsey patient objects
    // then insert them into an object keyed by uuid to deduplicate
    const deduplicatedNonNullPatient = response.data.results
      .filter(patient => patient)
      .reduce((acc, patient) => {
        acc[patient.uuid] = patient;
        return acc;
      }, {});
    // then take the values in the deduplication object (our original patient objects) and turn them into an array of patient objects
    return Object.values(deduplicatedNonNullPatient);
  } catch (error) {
    console.log("TCL: searchPatients -> error", error);
    console.log("TCL: searchPatients -> error.response", error.response);
    return false;
  }
};

//use patient id to get patient object
module.exports.get = async function getPatient(uuid, params = {}) {
  try {
    const response = await client({
      url: `patient/${uuid}`,
      method: "get",
      params
    });

    return response.data;
  } catch (error) {
    console.log("TCL: getPatients -> error", error);
    return false;
  }
};
