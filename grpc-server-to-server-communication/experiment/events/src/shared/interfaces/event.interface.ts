export interface EventRequestInterface {
  name: string,
  organizer: string,
  startsAt?: Date,
  venue: string,
  seats?: number
}

export interface EventModelInterface {
  id: number,
  name: string,
  organizer: string,
  venue: string,
  seats: number,
  startsAt: Date,
  createdAt?: Date,
  updatedAt?: Date
}
