import { promisify } from 'util';
import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import config from '../shared/configs';
import { TicketRequestInterface } from '../shared/interfaces/client.interface';

export class GrpcClientService {
  private readonly ticketClient;

  constructor() {
    const ticketPackageDef = protoLoader.loadSync(path.join(__dirname, "../proto/ticket.proto"));
    const ticketObject     = grpc.loadPackageDefinition(ticketPackageDef);
    const ticketPackage    = ticketObject.ticketPackage;

    // Plain text. Using createSsl requires providing ssl credentials
    // @ts-ignore: This is a valid code that works
    this.ticketClient = new ticketPackage.Ticket(config.grpcDNS.tickets, grpc.credentials.createInsecure());
  }

  async createTicket(ticketRequest: TicketRequestInterface) {
    return new Promise((resolve, reject) => {
      this.ticketClient.createTicket(ticketRequest, (err: any, res: any) => {
        if (err) return reject(err);

        resolve(res);
      })
    });
  }
}
