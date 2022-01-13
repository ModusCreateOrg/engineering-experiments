import * as grpc from '@grpc/grpc-js';
import { EventService, GrpcClientService } from '../services';
import { EventRequestInterface } from '../shared/interfaces/event.interface';
import { TicketRequestInterface } from '../shared/interfaces/client.interface';

export class GrpcController {
  private readonly eventService: EventService = new EventService();
  private readonly grpcClientService: GrpcClientService = new GrpcClientService();

  async getAll(call: grpc.ServerWritableStream<any, any>) {
    const events = await this.eventService.getAll();

    for (const event of events) {
      call.write(event);
    }
    call.end();

    return;
  }

  async getOne(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const event = await this.eventService.getOne(+call.request.id);
    callback(null, event);

    return;
  }

  async create(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const eventObject: EventRequestInterface = {
      name: call.request.name,
      organizer: call.request.organizer,
      startsAt: new Date(call.request.startsAt),
      venue: call.request.venue,
      seats: call.request.seats
    }

    const event = await this.eventService.create(eventObject);
    callback(null, event);

    return;
  }

  async getTickets(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const tickets = await this.grpcClientService.getTickets(+call.request.id);
    callback(null, tickets);

    return;
  }

  async buyTicket(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
    const ticketRequest: TicketRequestInterface = {
      eventId: call.request.id,
      addressee: call.request.addressee,
      noOfAttendees: call.request.noOfAttendees,
    };

    const ticket = await this.grpcClientService.buyTicket(ticketRequest);
    callback(null, ticket);

    return;
  }
}
