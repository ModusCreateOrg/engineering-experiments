import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import config from './shared/configs';

/** Testing Event Service calls */
const eventPackageDef  = protoLoader.loadSync(path.join(__dirname, "./proto/event.proto"));
const eventObject      = grpc.loadPackageDefinition(eventPackageDef);
const eventPackage     = eventObject.eventPackage;

// @ts-ignore: This is a valid code that works
const eventClient = new eventPackage.Event(config.grpcDNS.self, grpc.credentials.createInsecure());

const eventStream = eventClient.readEvents();
eventStream.on('data', (item: any) => { console.log(item) })
eventStream.on('end', () => { console.log('Stream done') })

const eventRequest = {
  name: 'Big Bang Theory Viewing',
  organizer: 'Leonord Hofstadter',
  venue: 'Campus',
  seats: 200,
  startsAt: '2018-12-01 10:00:00'
}
eventClient.createEvent(eventRequest, (err: any, res: any) => {
  console.log('New Event', res && res.name);
});

eventClient.readEvent({ id: 1 }, (err: any, res: any) => {
  console.log('Event', res && res.name);
});

eventClient.getTickets({ id: 1 }, (err: any, res: any) => {
  console.log('Tickets', res);
});

eventClient.buyTicket({ id: 1, addressee: 'Mr Donald', noOfTickets: 1 }, (err: any, res: any) => {
  console.log('Purchases', res);
});

/** Testing Invoice Service calls */
const invoicePackageDef  = protoLoader.loadSync(path.join(__dirname, "./proto/invoice.proto"));
const invoiceObject      = grpc.loadPackageDefinition(invoicePackageDef);
const invoicePackage     = invoiceObject.invoicePackage;

// @ts-ignore: This is a valid code that works
const invoiceClient = new invoicePackage.Invoice(config.grpcDNS.invoices, grpc.credentials.createInsecure());

const invoiceRequest = {
  eventId: 1,
  addressee: 'Mr Anthony',
  noOfAttendees: 2,
  isPaid: false
}
invoiceClient.createInvoice(invoiceRequest, (err: any, res: any) => {
  console.log('New Invoice', res);

  invoiceClient.payForInvoice({ id: res.id }, (err: any, resp: any) => {
    console.log('Paid for Invoice', resp);

    invoiceClient.readInvoice({ id: res.id }, (err: any, result: any) => {
      console.log('Read Paid Invoice', result);
    });
  });
});

invoiceClient.readInvoice({ id: 1 }, (err: any, res: any) => {
  console.log('Invoice', res);
});

/** Testing Ticket Service calls */
const ticketPackageDef  = protoLoader.loadSync(path.join(__dirname, "./proto/ticket.proto"));
const ticketObject      = grpc.loadPackageDefinition(ticketPackageDef);
const ticketPackage     = ticketObject.ticketPackage;

// @ts-ignore: This is a valid code that works
const ticketClient = new ticketPackage.Ticket(config.grpcDNS.tickets, grpc.credentials.createInsecure());

const ticketRequest = {
  eventId: 1,
  invoiceId: 1,
}
ticketClient.createTicket(ticketRequest, (err: any, res: any) => {
  console.log('New Ticket', res);

  ticketClient.readTicket({ id: res.id }, (err: any, resp: any) => {
    console.log('Read New Ticket', resp);
  });
});

const ticektStream = ticketClient.readEventTickets({ id: 1 });
ticektStream.on('data', (item: any) => { console.log(item) })
ticektStream.on('end', () => { console.log('Stream done') })

ticketClient.readTicket({ id: 1 }, (err: any, res: any) => {
  console.log('Ticket', res);
});

ticketClient.getAttendee({ id: 1 }, (err: any, res: any) => {
  console.log('Ticket Attendee', res);
});

ticketClient.getEvent({ id: 1 }, (err: any, res: any) => {
  console.log('Ticket Event', res);
});
