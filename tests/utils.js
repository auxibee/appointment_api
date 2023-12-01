const { default: axios } = require("axios");
const app = require("../app");
const config = require("../server/config/general");
let server;

const setUp = async () => {
  // start webserver
  server = app.listen(8080, () => console.log("server is runing"));
};

const tearDown = async () => {
  server.close();
};

const axiosConfig = {
  baseURL: `http://127.0.0.1:${config.PORT}`,
  validateStatus: () => true,
};

const axiosApiClient = axios.create(axiosConfig);

module.exports = { setUp, tearDown, axiosApiClient };
