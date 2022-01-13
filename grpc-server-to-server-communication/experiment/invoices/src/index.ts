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
router.post('/', httpController.create.bind(httpController));
router.get('/:id', httpController.getOne.bind(httpController));
router.put('/:id', httpController.update.bind(httpController));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/invoices', router);

app.listen(httpPort, () => console.log(`HTTP server is listening on ${httpPort}`));

// GRPC Server
const server         = new grpc.Server();
const packageDef     = protoLoader.loadSync(path.join(__dirname, "proto/invoice.proto"));
const grpcObject     = grpc.loadPackageDefinition(packageDef);
const invoicePackage = grpcObject.invoicePackage;
const grpcController = new GrpcController();

// Plain text. Using createSsl requires providing ssl credentials
server.bindAsync(config.grpcDNS.self, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) throw err;

  console.log(`gRPC server is listening on ${port}`);
  server.start();
});

// @ts-ignore: This is a valid code that works
server.addService(invoicePackage.Invoice.service, {
  createInvoice: grpcController.create.bind(grpcController),
  readInvoice: grpcController.getOne.bind(grpcController),
  payForInvoice: grpcController.update.bind(grpcController)
});
