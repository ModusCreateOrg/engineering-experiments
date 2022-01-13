import { EventService, HttpClientService } from '../services';
import { NextFunction, Request, Response } from 'express';
import { EventRequestInterface } from '../shared/interfaces/event.interface';
import { TicketRequestInterface } from '../shared/interfaces/client.interface';

export class HttpController {
  private readonly eventService: EventService = new EventService();
  private readonly httpClientService: HttpClientService = new HttpClientService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.eventService.getAll();

      res.status(200).json(events);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }

    return;
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await this.eventService.getOne(+req.params.id);

      res.status(200).json(event);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }

    return;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const eventObject: EventRequestInterface = {
        name: req.body.name,
        organizer: req.body.organizer,
        startsAt: req.body.startsAt && new Date(req.body.startsAt),
        venue: req.body.venue,
        seats: +req.body.seats || 0,
      }

      // Some validations here
      if (!eventObject.name) throw new Error('No event name defined!');
      if (!eventObject.venue) throw new Error('No event venue defined!');
      if (!eventObject.organizer) throw new Error('No event organizer defined!');

      const event = await this.eventService.create(eventObject);

      res.status(200).json(event);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }

    return;
  }

  async getTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await this.httpClientService.getTickets(req.params.id);

      res.status(200).json(tickets);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }

    return;
  }

  async buyTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const data: TicketRequestInterface = {
        addressee: req.body.addressee,
        eventId: +req.params.id,
        noOfAttendees: req.body.noOfAttendees
      };

      const ticket = await this.httpClientService.buyTicket(data);

      res.status(200).json(ticket);
    } catch (err: any) {
      res.status(400).end(err.message);
      next(err);
    }

    return;
  }
}
