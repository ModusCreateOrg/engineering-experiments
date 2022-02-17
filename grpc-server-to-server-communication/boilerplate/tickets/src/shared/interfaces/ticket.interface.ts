export interface TicketRequestInterface {
  eventId: number,
  invoiceId: number,
  validUntil?: Date
}

export interface TicketModelInterface extends TicketRequestInterface {
  id: number,
  createdAt?: Date,
  updatedAt?: Date
}
