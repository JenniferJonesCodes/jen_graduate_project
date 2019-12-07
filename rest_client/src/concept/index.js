const client = require("../lib/client");

const defaultParams = {
  limit: 2
};

//search for concept uuid for use in form on openMRS
async function searchConcepts(term, params = {}) {
  try {
    const response = await client({
      url: "concept",
      params: {
        q: term,
        ...params
      }
    });

    return response.data.results;
  } catch (error) {
    console.log("TCL: searchConcepts -> error", error);
    return false;
  }
}

module.exports.search = searchConcepts;

//search for each concept id and return
module.exports.getParamConcepts = async function getParamConcepts() {
  try {
    const temperatureResult = await searchConcepts("Temperature");
    const spo2Result = await searchConcepts("SPO2");
    const bpResult = await searchConcepts("Blood Pressure");
    const systolicDataResult = await searchConcepts("Systolic Data");
    const systolicResult = await searchConcepts("Systolic");
    const systolicAbnormalResult = await searchConcepts("Systolic Abnormal");
    const diastolicDataResult = await searchConcepts("Diastolic Data");
    const diastolicResult = await searchConcepts("Diastolic");
    const diastolicAbnormalResult = await searchConcepts("Diastolic Abnormal");
    if (
      !temperatureResult ||
      !spo2Result ||
      !bpResult ||
      !diastolicResult ||
      !systolicResult
    ) {
      throw new Error("Could not fetch param concepts");
    }
    return {
      temperature: temperatureResult[0].uuid,
      spo2: spo2Result[0].uuid,
      bloodPressure: bpResult[0].uuid,
      diastolicData: diastolicDataResult[0].uuid,
      diastolic: diastolicResult[0].uuid,
      diastolicAbnormal: diastolicAbnormalResult[0].uuid,
      systolicData: systolicDataResult[0].uuid,
      systolic: systolicResult[0].uuid,
      systolicAbnormal: systolicAbnormalResult[0].uuid
    };
  } catch (error) {
    console.log("TCL: testConcept -> error", error);
    console.log("TCL: testConcept -> error.response", error.response);
    return false;
  }
};
