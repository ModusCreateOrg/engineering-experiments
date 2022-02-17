const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/cluster-adapter');
const { setupWorker } = require('@socket.io/sticky');

const chatServer = require('./chat_withDB');

const port = parseInt(process.argv[2] || '8080');
const app = express();
const httpServer = createServer(app);

// Websocket Server
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.adapter(createAdapter());

setupWorker(io);

// mount chat server
chatServer(io);

console.log('Websocket Server is running at http://localhost:' + port);
