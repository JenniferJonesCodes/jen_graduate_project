const { user } = require("../../src/");

module.exports = async function testUser() {
  const result = await user.list();
  if (!result) {
    console.log("userTest failed");
  } else {
    console.log("userTest passed");
  }
};
