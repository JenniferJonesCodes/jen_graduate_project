const client = require("../lib/client");
const Buffer = require("buffer").Buffer;

const invalidUserError = "Username or password is incorrect, please try again.";

//request with username:password in base64
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

    if (!response.data.user) {
      throw new Error(invalidUserError);
    }

    const tokenCookie = response.headers["set-cookie"][0].split(";")[0];

    client.setToken(tokenCookie);

    return response.data.user;
  } catch (error) {
    client.clearToken();
    if (error.message === invalidUserError) {
      throw error;
    }
    throw new Error(
      "Could not login, please check your network connection and try again."
    );
  }
};

module.exports.end = client.clearToken;
