import { BaseModel } from "./base.model";

export class TicketModel extends BaseModel {
  /** @var string name of table */
  protected table: string = 'tickets';

  /** @var Object columns in table. If marked false, will not be returned in find queries */
  protected columns = {
    id: { autoincrement: true, type: 'int' },
    event_id: { type: 'int', mutator: 'eventId' },
    invoice_id: { type: 'int', mutator: 'invoiceId' },
    valid_until: { type: 'date', mutator: 'validUntil' },
    created_at: { type: 'date', mutator: 'createdAt', hidden: true },
    updated_at: { type: 'date', mutator: 'updatedAt', hidden: true },
  };
}
