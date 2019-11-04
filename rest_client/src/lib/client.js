process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://192.168.33.10/openmrs/ws/rest/v1/",
  //timeout: 2000,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});

module.exports = instance;

module.exports.setToken = function setToken(token) {
  instance.defaults.headers.Cookie = token;
};

module.exports.clearToken = function clearToken() {
  instance.defaults.headers.Cookie = "";
};
