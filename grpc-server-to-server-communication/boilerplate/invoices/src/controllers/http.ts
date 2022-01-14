import { HttpClientService, InvoiceService } from '../services';
import { NextFunction, Request, Response } from 'express';
import { InvoiceRequestInterface } from '../shared/interfaces/invoice.interface';
import { TicketRequestInterface } from '../shared/interfaces/client.interface';

export class HttpController {
  private readonly invoiceService: InvoiceService = new InvoiceService();
  private readonly httpClientService: HttpClientService = new HttpClientService();

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const invoice = await this.invoiceService.getOne(+req.params.id);

      res.status(200).json(invoice);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceObject: InvoiceRequestInterface = {
        addressee: req.body.addressee,
        eventId: req.body.eventId,
        noOfAttendees: req.body.noOfAttendees || 1, // default to 1 ticket if a number is not specified
        isPaid: !!req.body.isPaid // defaults to no payment
      }

      // Some validations here
      if (!invoiceObject.addressee) throw new Error('No invoice addressee defined!');
      if (!invoiceObject.eventId) throw new Error('No invoice eventId defined!');

      const invoice = await this.invoiceService.create(invoiceObject);
      const ticketRequest: TicketRequestInterface = {
        eventId: invoice.eventId,
        invoiceId: invoice.id
      }

      const ticket = await this.httpClientService.createTicket(ticketRequest);

      res.status(200).json({ invoice, ticket });
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // Todo: Perform some verification to prevent creating multiple tickets for one payment
      const invoice = await this.invoiceService.update(+req.params.id, { is_paid: true });

      const ticketRequest: TicketRequestInterface = {
        eventId: invoice.eventId,
        invoiceId: invoice.id
      }

      const ticket = await this.httpClientService.createTicket(ticketRequest);

      res.status(200).json({ invoice, ticket });
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }
}
