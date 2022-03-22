import express from 'express';
import { AddressInfo } from 'net';
import path from 'path';
import config from './config';
import router from './router/api';
import Logger from './service/LoggerService';

const app = express();

app.use(express.urlencoded())
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(router)

const server = app.listen(config.APP_PORT, () => {
  const { port } = server.address() as AddressInfo
  Logger.success(`Server has started in port ${port}`)
})
