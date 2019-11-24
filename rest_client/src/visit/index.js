const client = require("../lib/client");

const defaultParams = {
  limit: 2
};

//get patient visits using patient uuid
module.exports.search = async function searchVisit(uuid, params = {}) {
  try {
    const response = await client({
      url: "visit",
      params: {
        ...defaultParams,
        ...params
      }
    });
    return response.data.results;
  } catch (error) {
    console.log("TCL: searchVisit -> error", error);
    return false;
  }
};

//get info for specific visit
module.exports.get = async function getVisit(uuid, params = {}) {
  try {
    const response = await client({
      url: `visit/${uuid}`,
      method: "get",
      params: {
        ...defaultParams,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.log("TCL: getVisit -> error", error);
    return false;
  }
};
