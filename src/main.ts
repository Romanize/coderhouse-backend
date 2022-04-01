import express from 'express';
import { AddressInfo } from 'net';
import path from 'path';
import config from './config';
import Logger from './service/LoggerService';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import fs from 'fs';

const app = express();
const httpServer = new Server(app);
const io = new SocketServer(httpServer);

app.use(express.urlencoded())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

let messages: any[] = [];

(async () => {
  try {
    const response = await fs.promises.readFile('src/db/messages.json', 'utf-8');
    messages = await JSON.parse(response);
  } catch (e) {
    if(e instanceof Error) Logger.error(e.message);
  }
})()

const products: any[] = [];
let idCounter = 1;

io.on('connection', async (socket) => {
  Logger.success('A new user has connected');

  socket.emit('previousMessages', messages);
  socket.emit('previousProducts', products);

  socket.on('message', async (data) => {
    messages.push(data);
    await fs.promises.writeFile('src/db/messages.json', JSON.stringify(messages, null, 2));
    io.sockets.emit('previousMessages', messages);
  })

  socket.on('product', (data) => {
    const newProduct = {...data, id: idCounter};
    idCounter++;
    products.push(newProduct)
    io.sockets.emit('previousProducts', products);
  })
});

const server = httpServer.listen(config.APP_PORT, () => {
  const { port } = server.address() as AddressInfo
  Logger.success(`Server has started in port ${port}`)
})
