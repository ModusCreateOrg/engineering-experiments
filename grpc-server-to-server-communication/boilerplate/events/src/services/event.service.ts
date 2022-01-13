import { EventModelInterface, EventRequestInterface } from "../shared/interfaces/event.interface";
import { EventModel } from "../db/models";

export class EventService {
  private readonly model: EventModel = new EventModel();

  async getAll(): Promise<EventModelInterface[]> {
    return this.model.findAll();
  }

  async getOne(eventId: number): Promise<EventModelInterface> {
    return this.model.findOne(eventId);
  }

  async create(eventRequest: EventRequestInterface): Promise<EventModelInterface> {
    const eventObject = { ...eventRequest, starts_at: eventRequest.startsAt };
    delete eventObject.startsAt;

    return this.model.create(eventObject);
  }
}
