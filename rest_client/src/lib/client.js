process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require("axios");

const instance = axios.create({
  baseURL: "https://demo.mybahmni.org//openmrs/ws/rest/v1/",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  withCredentials: true
});

module.exports = instance;

module.exports.setToken = function setToken(token) {
  instance.defaults.headers.Authorization = token;
};

module.exports.clearToken = function clearToken() {
  instance.defaults.headers.Authorization = "";
};
