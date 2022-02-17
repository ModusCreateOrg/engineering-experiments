import { HttpClientService, TicketService } from '../services';
import { NextFunction, Request, Response } from 'express';
import { TicketRequestInterface } from '../shared/interfaces/ticket.interface';

export class HttpController {
  private readonly ticketService: TicketService = new TicketService();
  private readonly httpClientService: HttpClientService = new HttpClientService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let tickets = {};
      const eventId = req.query.eventId != null ? +req.query.eventId : undefined;

      tickets = await this.ticketService.getAll(eventId);

      res.status(200).json(tickets);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await this.ticketService.getOne(+req.params.id);

      res.status(200).json(ticket);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketObject: TicketRequestInterface = {
        eventId: req.body.eventId,
        invoiceId: req.body.invoiceId,
        validUntil: req.body.validUntil && new Date(req.body.validUntil)
      }

      // Some validations here
      if (!ticketObject.eventId) throw new Error('No ticket eventId defined!');
      if (!ticketObject.invoiceId) throw new Error('No ticket invoiceId defined!');

      const ticket = await this.ticketService.create(ticketObject);

      res.status(200).json(ticket);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }

  async getAttendeeInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await this.ticketService.getOne(+req.params.id);
      const attendee = await this.httpClientService.getAttendeeInfo(ticket.invoiceId);

      res.status(200).json(attendee);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }

  async getEventInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await this.ticketService.getOne(+req.params.id);
      const event = await this.httpClientService.getEventInfo(ticket.eventId);

      res.status(200).json(event);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }
  }
}
