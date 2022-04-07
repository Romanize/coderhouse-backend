import express from 'express';
import { AddressInfo } from 'net';
import config from './config';
import { productsRouter, shoppingCartRouter } from './router';
import Logger from './service/LoggerService';

const app = express();

app.use(express.urlencoded())
app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/carts', shoppingCartRouter);

const server = app.listen(config.APP_PORT, () => {
  const { port } = server.address() as AddressInfo
  Logger.success(`Server has started in port ${port}`)
})
