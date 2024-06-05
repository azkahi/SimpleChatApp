import { Server } from 'socket.io';
import { createServer } from 'http';
import request from 'supertest';
import express from 'express';
import { randomUUID } from 'crypto';

import router from './src/router';
import { addUser, removeUser, getUser } from './src/users';

describe('Socket.io Server', () => {
  let app;
  let server;
  let io;

  beforeAll(() => {
    app = express();
    app.use(router);
    server = createServer(app);
    io = new Server(server);
  });

  afterAll(() => {
    server.close();
  });

  it('should add a user when join event is emitted', (done) => {
    const socket = io();
    const user = { id: randomUUID(), name: 'John', token: 'abc123' };

    socket.emit('join', user, (error) => {
      expect(error).toBeUndefined();
      expect(addUser).toHaveBeenCalledWith(user);
      done();
    });
  });

  it('should send a message when sendMessage event is emitted', (done) => {
    const socket = io();
    const user = { id: randomUUID(), name: 'John', token: 'abc123' };
    const message = 'Hello, world!';

    socket.emit('sendMessage', { message, token: user.token }, (error) => {
      expect(error).toBeUndefined();
      expect(getUser).toHaveBeenCalledWith(user.token);
      done();
    });
  });

  it('should remove a user when disconnect event is emitted', (done) => {
    const socket = io();

    socket.emit('disconnect', () => {
      expect(removeUser).toHaveBeenCalledWith(socket.id);
      done();
    });
  });
});

describe('Express Server', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(router);
  });

  it('should return 200 status code for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return 404 status code for GET /unknown', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});