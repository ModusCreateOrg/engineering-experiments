import * as grpc from '@grpc/grpc-js';
import { GrpcClientService, TicketService } from '../services';
import { TicketRequestInterface } from '../shared/interfaces/ticket.interface';

export class GrpcController {
  private readonly ticketService: TicketService = new TicketService();
  private readonly grpcClientService: GrpcClientService = new GrpcClientService();

  async getAll(call: grpc.ServerWritableStream<any, any>) {
    const tickets = await this.ticketService.getAll();

    for (const ticket of tickets) {
      call.write(ticket);
    }
    call.end();
  }

  async getOne(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const ticket = await this.ticketService.getOne(call.request.id);
    callback(null, ticket);
  }

  async create(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const ticketObject: TicketRequestInterface = {
      eventId: call.request.eventId,
      invoiceId: call.request.invoiceId,
      validUntil: call.request.validUntil && new Date(call.request.validUntil)
    }

    // Some validations here
    if (!ticketObject.eventId) throw new Error('No ticket eventId defined!');
    if (!ticketObject.invoiceId) throw new Error('No ticket invoiceId defined!');

    const ticket = await this.ticketService.create(ticketObject);
    callback(null, ticket);
  }

  async getAttendeeInfo(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const ticket = await this.ticketService.getOne(call.request.id);
    const attendee = await this.grpcClientService.getAttendeeInfo(ticket.invoiceId);

    callback(null, attendee);
  }

  async getEventInfo(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const ticket = await this.ticketService.getOne(call.request.id);
    const event = await this.grpcClientService.getEventInfo(ticket.eventId);

    callback(null, event);
  }
}
