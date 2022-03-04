import express from 'express';
import { AddressInfo } from 'net';
import config from './config';
import router from './router/api';
import Logger from './service/LoggerService';

const app = express();

app.use('/', router)

const server = app.listen(config.APP_PORT, () => {
  const { port } = server.address() as AddressInfo
  Logger.success(`Server has started in port ${port}`)
})
