const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const redis = require('socket.io-redis');
const chatServer = require('./chat');

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

// bringing redis into the mix
io.adapter(redis({ host: 'redis', port: 6379 }));

// mount chat server
chatServer(io);

httpServer.listen(port);

console.log('Websocket Server is running at http://localhost:' + port);
