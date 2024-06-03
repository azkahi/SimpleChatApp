import 'dotenv/config'

import { createServer } from 'http';
import express, { query } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import AuthGoogle from './src/auth';
import router from './src/router';
import { addUser, removeUser, getUser, getUsersInRoom } from './src/users';
import { randomUUID } from 'crypto';

const app: express.Application = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  },
  cookie: true
});

const PORT: number = parseInt(process.env.PORT ?? "5000");

io.use((socket, next) => {
  const { error } = AuthGoogle(socket.handshake.auth.token ?? "", socket.handshake.headers.authorization ?? "");

  if (error) next(new Error(error));

  next();
});

io.on('connect', (socket) => {
  socket.on('join', ({ name, token }: { name: string, token: string }, callback: Function) => {
    const { error, user } = addUser({ id: randomUUID(), name, token });

    if (error) return callback(error);

    if (!user) return callback(error);

    socket.broadcast.emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socket.broadcast.emit('roomData', { users: getUsersInRoom() });

    callback();
  });

  socket.on('sendMessage', ({ message, token }: { message: string, token: string }, callback: Function) => {
    const user = getUser(token);
    if (!user) return callback("An error has occured. Not authenticated.");

    socket.broadcast.emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      socket.broadcast.emit('message', { user: 'admin', text: `${user.name} has left.` });
      socket.broadcast.emit('roomData', { users: getUsersInRoom() });
    }
  })
});

io.listen(PORT);