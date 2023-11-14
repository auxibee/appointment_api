/* eslint-disable import/no-extraneous-dependencies */
const app = require('../app');
const config = require('../server/config/general');

async function startServer() {
  app.listen(config.PORT, () => console.log('server is runing'));
}

startServer();
