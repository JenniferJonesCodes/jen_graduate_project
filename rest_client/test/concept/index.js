const {
  concept: { getParamConcepts }
} = require("../../src/");

module.exports = async function testConcept() {
  try {
    const result = await getParamConcepts();
    console.log("TCL: testConcept -> result", result);
    console.log("concept test passed");
    return result;
  } catch (error) {
    console.log("TCL: testConcept -> error", error);
    console.log("TCL: testConcept -> error.response", error.response);
  }
};
