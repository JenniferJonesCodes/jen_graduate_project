const {
  encounter: { create }
} = require("../../src/");

module.exports = async function testEncounter({ concepts, patientID }) {
  const params = {
    // location: "Unknown Location",
    // encounterType: "Patient Measurements"
    encounterType: "Patient Document",
    //encounterDatetime: "2019-12-01",
    //60d7f7c5-5fab-476c-b3ae-6c030db6219a
    // provider: "5ee9b94c-81f8-4c15-96ec-c1aa9c0b0d66"
    obs: [
      {
        concept: concepts.temperature,
        value: 37
      },
      {
        concept: concepts.spo2,
        value: 97.0
      },
      {
        concept: concepts.bloodPressure,
        groupMembers: [
          {
            concept: concepts.diastolicData,
            groupMembers: [
              {
                concept: concepts.diastolic,
                value: 75
              },
              {
                concept: concepts.diastolicAbnormal,
                value: false
              }
            ]
          },
          {
            concepts: concepts.systolicData,
            groupMembers: [
              {
                concept: concepts.systolic,
                value: 120
              },
              {
                concept: concepts.systolicAbnormal,
                value: false
              }
            ]
          }
        ]
      }
      // {
      //   concept: "Blood Pressure",
      //   value: [
      //     {
      //       concept: "Systolic Data",
      //       value: "102"
      //     },
      //     {
      //       concept: "Diastolic Data",
      //       value: "112"
      //     },
      //     {
      //       concept: "Posture",
      //       value: "10"
      //     }
      //   ]
      // }
    ]
  };

  try {
    const result = await create(patientID, params);
    console.log("TCL: testEncounter -> result", result);
  } catch (error) {
    console.log("TCL: testEncounter -> error", error);
    console.log("TCL: testEncounter -> error.response", error.response);
  }
};
