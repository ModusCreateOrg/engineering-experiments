const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const chatServer = require('./chat');
const stickyCluster = require('sticky-cluster');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const port = parseInt(process.argv[2] || '8080');

if (cluster.isMaster) {
    console.log('this is the master process: ', process.pid);
}

stickyCluster(callback => {
    const app = express();
    const httpServer = createServer(app);

    // Websocket Server
    chatServer(new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    }));

    console.log(`worker ${process.pid}...`);
    console.log('Websocket Server Instance is running at http://localhost:' + port);

    callback(httpServer);
}, {
    concurrency: (numCPUs - 1) || 3,
    port: port,
    debug: true,
    env: function (index) {
        return {
            stickycluster_worker_index: index
        };
    }
});
