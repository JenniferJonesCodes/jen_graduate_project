const client = require("../lib/client");

const defaultParams = {
  limit: 2,
  v: "full"
};

//get patient visits using patient uuid
module.exports.search = async function searchVisit(params = {}) {
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

//get info for a specific visit
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

//create a new visit
module.exports.post = async function createVisit(uuid, params = {}) {
  try {
    const response = await client({
      url: `visit/${uuid}`,
      method: "post",
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
