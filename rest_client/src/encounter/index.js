const client = require("../lib/client");

const defaultParams = {
  limit: 2
};

// create an encounter for a patient
module.exports.create = async function createEncounter(patientID, params = {}) {
  try {
    const response = await client({
      url: "encounter",
      method: "post",
      data: {
        // encounterDatetime: new Date().toString(),
        patient: patientID,
        // ...defaultParams,
        ...params
      }
    });

    console.log("TCL: createEncounter -> response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("TCL: createEncounter -> error", error);
    console.log(
      "TCL: createEncounter -> error.response.data.error",
      error.response.data.error
    );
    return false;
  }
};

// echo '{

// "patient": "5ee9b94c-81f8-4c15-96ec-c1aa9c0b0d66",

//   "encounterDatetime": "2011-02-18",

//     "location": "Unknown Location",

//       "encounterType": "ADULTINITIAL",

//         "provider": "5ee9b94c-81f8-4c15-96ec-c1aa9c0b0d66",

//           "obs": [

//             {

//               "concept": "WEIGHT",

//               "value": "70"

//             }

//           ]

// }' | curl -i -u admin:test -H "Content-type: application/json" -X POST -d @- http://localhost:8080/openmrs/ws/rest/v1/encounter
