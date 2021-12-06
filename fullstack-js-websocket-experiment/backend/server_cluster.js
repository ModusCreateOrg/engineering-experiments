const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const chatServer = require('./chat');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const port = parseInt(process.argv[2] || '8080');

if (cluster.isMaster) {
    console.log('this is the master process: ', process.pid);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`worker process ${process.pid} had died`);
        console.log(`starting new worker`);
        cluster.fork();
    });
} else {
    const app = express();
    const httpServer = createServer(app);

    // Websocket Server
    chatServer(new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    }));

    httpServer.listen(port);
    console.log(`worker ${process.pid}...`);
    console.log('Websocket Server Instance is running at http://localhost:' + port);
}
