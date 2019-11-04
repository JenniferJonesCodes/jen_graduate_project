const client = require("../lib/client");
const Buffer = require("buffer").Buffer;

module.exports.create = async function create(username, password) {
  try {
    const base64Credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    const response = await client({
      url: "session",
      method: "get",
      headers: {
        Authorization: `Basic ${base64Credentials}`
      }
    });

    const tokenCookie = response.headers["set-cookie"][0].split(";")[0];

    client.setToken(tokenCookie);

    return response.data.user;
  } catch (error) {
    console.log("TCL: create -> error", error);

    client.clearToken();
    return false;
  }
};
