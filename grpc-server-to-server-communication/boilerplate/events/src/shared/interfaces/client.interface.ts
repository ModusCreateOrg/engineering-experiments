export interface HttpRequestConfigInterface {
  hostname: string,
  path: string,
  method: 'GET' | 'POST',
  port?: number
}

export interface TicketRequestInterface {
  addressee: string,
  eventId: number,
  noOfAttendees: number
}
