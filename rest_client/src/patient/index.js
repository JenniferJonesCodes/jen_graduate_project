const client = require("../lib/client");

const defaultParams = {};

//search for a patient using name to get patient id
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
    return response.data.results;
  } catch (error) {
    console.log("TCL: searchPatients -> error", error);
    console.log("TCL: searchPatients -> error.response", error.response);
    return false;
  }
};

//use patient id to get patient info
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
