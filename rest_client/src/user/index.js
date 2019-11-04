const client = require("../lib/client");

const defaultParams = { limit: 2 };

module.exports.list = async function listUsers(params = defaultParams) {
  try {
    const response = await client({
      url: "user",
      params
    });

    return response.data;
  } catch (error) {
    console.log("TCL: listUsers -> error", error);
    return null;
  }
};
