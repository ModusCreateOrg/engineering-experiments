export interface InvoiceRequestInterface {
  addressee: string,
  eventId: number,
  noOfAttendees: number,
  isPaid: boolean,
}

export interface InvoiceModelInterface extends InvoiceRequestInterface {
  id: number,
  createdAt?: Date,
  updatedAt?: Date
}
