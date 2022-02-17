const cluster = require('cluster');
const { createServer } = require('http');
const { Server } = require('socket.io');
const numCPUs = require('os').cpus().length;
const { setupMaster, setupWorker } = require('@socket.io/sticky');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');
const chatServer = require('./chat');

const port = parseInt(process.argv[2] || '8080');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    const httpServer = createServer();

    // setup sticky sessions
    setupMaster(httpServer, {
        loadBalancingMethod: 'least-connection'
    });

    // setup connections between the workers
    setupPrimary();

    cluster.setupPrimary({
        serialization: 'advanced'
    });

    httpServer.listen(port);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);

    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    // use the cluster adapter
    io.adapter(createAdapter());

    // setup connection with the primary process
    setupWorker(io);

    chatServer(io);
}
