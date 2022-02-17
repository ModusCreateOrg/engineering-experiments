import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import config from '../shared/configs';

export class GrpcClientService {
  private readonly eventClient;
  private readonly invoiceClient;

  constructor() {
    const eventPackageDef = protoLoader.loadSync(path.join(__dirname, "../proto/event.proto"));
    const eventObject     = grpc.loadPackageDefinition(eventPackageDef);
    const eventPackage    = eventObject.eventPackage;

    // Plain text. Using createSsl requires providing ssl credentials
    // @ts-ignore: This is a valid code that works
    this.eventClient = new eventPackage.Event(config.grpcDNS.events, grpc.credentials.createInsecure());

    const invoicePackageDef = protoLoader.loadSync(path.join(__dirname, "../proto/invoice.proto"));
    const invoiceObject     = grpc.loadPackageDefinition(invoicePackageDef);
    const invoicePackage    = invoiceObject.invoicePackage;

    // @ts-ignore: This is a valid code that works
    this.invoiceClient = new invoicePackage.Invoice(config.grpcDNS.invoices, grpc.credentials.createInsecure());
  }

  async getEventInfo(eventId: number) {
    return new Promise((resolve, reject) => {
      this.eventClient.readEvent({ id: eventId }, (err: any, res: any) => {
        if (err) return reject(err);

        resolve(res);
      })
    });
  }

  async getAttendeeInfo(invoiceId: number) {
    return new Promise((resolve, reject) => {
      this.invoiceClient.readInvoice({ id: invoiceId }, (err: any, res: any) => {
        if (err) return reject(err);

        resolve(res);
      })
    });
  }
}
