import * as grpc from '@grpc/grpc-js';
import { GrpcClientService, InvoiceService } from '../services';
import { InvoiceRequestInterface } from '../shared/interfaces/invoice.interface';
import { TicketRequestInterface } from '../shared/interfaces/client.interface';

export class GrpcController {
  private readonly invoiceService: InvoiceService = new InvoiceService();
  private readonly grpcClientService: GrpcClientService = new GrpcClientService();

  async getOne(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const invoice = await this.invoiceService.getOne(call.request.id);
    callback(null, invoice);
  }

  async create(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const invoiceObject: InvoiceRequestInterface = {
      addressee: call.request.addressee,
      eventId: call.request.eventId,
      noOfAttendees: call.request.noOfAttendees || 1, // default to 1 ticket if a number is not specified
      isPaid: !!call.request.isPaid // defaults to no payment
    }

    // Some validations here
    if (!invoiceObject.addressee) throw new Error('No invoice addressee defined!');
    if (!invoiceObject.eventId) throw new Error('No invoice eventId defined!');

    const invoice = await this.invoiceService.create(invoiceObject);
    const ticketRequest: TicketRequestInterface = {
      eventId: invoice.eventId,
      invoiceId: invoice.id
    }

    await this.grpcClientService.createTicket(ticketRequest);

    callback(null, invoice);
  }

  async update(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    // Todo: Perform some verification to prevent creating multiple tickets for one payment
    const invoice = await this.invoiceService.update(call.request.id, { is_paid: true });

    const ticketRequest: TicketRequestInterface = {
      eventId: invoice.eventId,
      invoiceId: invoice.id
    }

    const ticket = await this.grpcClientService.createTicket(ticketRequest);
    callback(null, ticket);
  }
}
