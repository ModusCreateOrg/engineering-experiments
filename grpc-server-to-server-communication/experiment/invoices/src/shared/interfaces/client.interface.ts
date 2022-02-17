export interface HttpRequestConfigInterface {
  hostname: string,
  path: string,
  method: 'GET' | 'POST',
  port: number
}

export interface TicketRequestInterface {
  invoiceId: number,
  eventId: number
}
