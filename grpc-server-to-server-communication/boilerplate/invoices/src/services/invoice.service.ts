import { InvoiceModelInterface, InvoiceRequestInterface } from "../shared/interfaces/invoice.interface";
import { InvoiceModel } from "../db/models";

export class InvoiceService {
  private readonly model: InvoiceModel = new InvoiceModel();
  async getAll(): Promise<InvoiceModelInterface[]> {
    return this.model.findAll();
  }

  async getOne(eventId: number): Promise<InvoiceModelInterface> {
    return this.model.findOne(eventId);
  }

  async create(invoiceRequest: InvoiceRequestInterface): Promise<InvoiceModelInterface> {
    const invoiceObject = {
      addressee: invoiceRequest.addressee,
      event_id: invoiceRequest.eventId,
      no_of_attendees: invoiceRequest.noOfAttendees,
      is_paid: invoiceRequest.isPaid,
    }

    return this.model.create(invoiceObject);
  }

  async update(invoiceId: number, data: Record<any, any>): Promise<InvoiceModelInterface> {
    return this.model.update(invoiceId, data);
  }
}
