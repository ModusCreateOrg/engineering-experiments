import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import config from '../shared/configs';
import { TicketRequestInterface } from '../shared/interfaces/client.interface';

export class GrpcClientService {
  private readonly ticketClient;
  private readonly invoiceClient;

  constructor() {
    const ticketPackageDef = protoLoader.loadSync(path.join(__dirname, "../proto/ticket.proto"));
    const ticketObject     = grpc.loadPackageDefinition(ticketPackageDef);
    const ticketPackage    = ticketObject.ticketPackage;

    // Plain text. Using createSsl requires providing ssl credentials
    // @ts-ignore: This is a valid code that works
    this.ticketClient = new ticketPackage.Ticket(config.grpcDNS.tickets, grpc.credentials.createInsecure());

    const invoicePackageDef = protoLoader.loadSync(path.join(__dirname, "../proto/invoice.proto"));
    const invoiceObject     = grpc.loadPackageDefinition(invoicePackageDef);
    const invoicePackage    = invoiceObject.invoicePackage;

    // @ts-ignore: This is a valid code that works
    this.invoiceClient = new invoicePackage.Invoice(config.grpcDNS.invoices, grpc.credentials.createInsecure());
  }

  /**
   * We have a gRPC stream here
   */
  async getTickets(eventId: number) {
    return new Promise((resolve, reject) => {
      const tickets: any[] = [];
      const stream = this.ticketClient.readEventTickets({ eventId });
      stream.on('data', (item: any) => { tickets.push(item) })
      stream.on('end', () => { resolve({ items: tickets }) })
    });
  }

  async buyTicket(ticketRequest: TicketRequestInterface) {
    const data = { ...ticketRequest, isPaid: true };

    // Favour custom promise as util.promisify from node fails with the client
    return new Promise((resolve, reject) => {
      this.invoiceClient.createInvoice(data, (err: any, res: any) => {
        if (err) return reject(err);

        resolve(res);
      })
    });
  }
}
