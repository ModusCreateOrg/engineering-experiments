import { BaseModel } from "./base.model";

export class EventModel extends BaseModel {
  /** @var string name of table */
  protected table: string = 'events';

  /** @var Object columns in table. If marked false, will not be returned in find queries */
  protected columns = {
    id: { autoincrement: true, type: 'int' },
    name: { type: 'string' },
    organizer: { type: 'string' },
    venue: { type: 'string' },
    seats: { type: 'int' },
    starts_at: { type: 'date', mutator: 'startsAt' },
    created_at: { type: 'date', mutator: 'createdAt', hidden: true },
    updated_at: { type: 'date', mutator: 'updatedAt', hidden: true },
  };
}
