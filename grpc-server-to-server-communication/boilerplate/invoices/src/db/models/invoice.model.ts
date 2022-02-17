import { BaseModel } from "./base.model";

export class InvoiceModel extends BaseModel {
  /** @var string name of table */
  protected table: string = 'invoices';

  /** @var Object columns in table. If marked false, will not be returned in find queries */
  protected columns = {
    id: { autoincrement: true, type: 'int' },
    addressee: { type: 'string' },
    event_id: { type: 'int', mutator: 'eventId' },
    no_of_attendees: { type: 'int', mutator: 'noOfAttendees' },
    is_paid: { type: 'boolean', mutator: 'isPaid' },
    created_at: { type: 'date', mutator: 'createdAt', hidden: true },
    updated_at: { type: 'date', mutator: 'updatedAt', hidden: true },
  };
}
