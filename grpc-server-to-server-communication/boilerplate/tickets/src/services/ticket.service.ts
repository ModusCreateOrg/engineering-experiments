import { TicketModelInterface, TicketRequestInterface } from "../shared/interfaces/ticket.interface";
import { TicketModel } from "../db/models";

export class TicketService {
  private readonly model: TicketModel = new TicketModel();

  async getAll(eventId?: number): Promise<TicketModelInterface[]> {
    if (eventId) return this.model.findAllBy({ event_id: eventId });

    return this.model.findAll();
  }

  async getOne(ticketId: number): Promise<TicketModelInterface> {
    return this.model.findOne(ticketId);
  }

  async create(ticketRequest: TicketRequestInterface): Promise<TicketModelInterface> {
    const ticketObject = {
      event_id: ticketRequest.eventId,
      invoice_id: ticketRequest.invoiceId,
      valid_until: ticketRequest.validUntil,
    }

    return this.model.create(ticketObject);
  }
}
