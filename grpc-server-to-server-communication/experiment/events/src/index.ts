import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import express from 'express';
import cors from 'cors';
import { HttpController } from './controllers/http';
import config from './shared/configs';
import { GrpcController } from './controllers/grpc';

const app            = express();
const router         = express.Router();
const httpPort       = config.httpPorts.self;
const httpController = new HttpController();

// Actual HTTP APIs
router.get('/', httpController.getAll.bind(httpController));
router.post('/', httpController.create.bind(httpController));
router.get('/:id', httpController.getOne.bind(httpController));

router.get('/:id/tickets', httpController.getTickets.bind(httpController));
router.post('/:id/tickets', httpController.buyTicket.bind(httpController));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/events', router);

app.listen(httpPort, () => console.log(`HTTP server is listening on ${httpPort}`));

// GRPC Server
const server         = new grpc.Server();
const packageDef     = protoLoader.loadSync(path.join(__dirname, "proto/event.proto"));
const grpcObject     = grpc.loadPackageDefinition(packageDef);
const eventPackage   = grpcObject.eventPackage;
const grpcController = new GrpcController();

// Plain text. Using createSsl requires providing ssl credentials
server.bindAsync(config.grpcDNS.self, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) throw err;

  console.log(`gRPC server is listening on ${port}`);
  server.start();
});

// @ts-ignore: This is a valid code that works
server.addService(eventPackage.Event.service, {
  createEvent: grpcController.create.bind(grpcController),
  readEvent: grpcController.getOne.bind(grpcController),
  readEvents: grpcController.getAll.bind(grpcController),
  getTickets: grpcController.getTickets.bind(grpcController),
  buyTicket: grpcController.buyTicket.bind(grpcController)
});
