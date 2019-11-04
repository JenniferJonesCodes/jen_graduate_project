const {
  session: { create }
} = require("../../src/");

module.exports = async function sessionTest() {
  const result = await create("superman", "Admin123");
  if (!result) {
    console.log("sessionTest failed");
  } else {
    console.log("sessionTest passed");
  }
};
