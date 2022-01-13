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

// Actual APIs
router.get('/', httpController.getAll.bind(httpController));
router.post('/', httpController.create.bind(httpController));

router.get('/:id', httpController.getOne.bind(httpController));
router.get('/:id/attendee', httpController.getAttendeeInfo.bind(httpController));
router.get('/:id/event', httpController.getEventInfo.bind(httpController ));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tickets', router);

app.listen(httpPort, () => console.log(`HTTP server is listening on ${httpPort}`));

// GRPC Server
const server         = new grpc.Server();
const packageDef     = protoLoader.loadSync(path.join(__dirname, "proto/ticket.proto"));
const grpcObject     = grpc.loadPackageDefinition(packageDef);
const ticketPackage  = grpcObject.ticketPackage;
const grpcController = new GrpcController();

// Plain text. Using createSsl requires providing ssl credentials
server.bindAsync(config.grpcDNS.self, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) throw err;

  console.log(`gRPC server is listening on ${port}`);
  server.start();
});

// @ts-ignore: This is a valid code that works
server.addService(ticketPackage.Ticket.service, {
  createTicket: grpcController.create.bind(grpcController),
  readTicket: grpcController.getOne.bind(grpcController),
  readEventTickets: grpcController.getAll.bind(grpcController),
  getAttendee: grpcController.getAttendeeInfo.bind(grpcController),
  getEvent: grpcController.getEventInfo.bind(grpcController)
});
