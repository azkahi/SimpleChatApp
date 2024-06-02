import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import { addUser, removeUser, getUser, getUsersInRoom } from './src/users';

import router from './src/router';

const app: express.Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }: { name: string, room: string }, callback: Function) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    if(!user) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message: string, callback: Function) => {
    const user = getUser(socket.id);

    if(!user) return callback("An error has occured. No user is found.");

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

httpServer.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));