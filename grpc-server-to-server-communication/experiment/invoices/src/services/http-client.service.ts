import * as http from 'http';
import { HttpRequestConfigInterface, TicketRequestInterface } from '../shared/interfaces/client.interface';
import config from '../shared/configs';

export class HttpClientService {
  private async sendRequest(opts: HttpRequestConfigInterface, data?: Record<any, any>) {
    return new Promise((resolve, reject) => {
      const options = {
        ...opts,
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const req = http.request(options, res => {
        res.on('data', d => { resolve(JSON.parse(d.toString())) })
      })

      req.on('error', error => { reject(error) })

      if (options.method === 'POST' && data) {
        req.write(JSON.stringify(data))
      }

      req.end()
    });
  }

  async createTicket(ticketRequest: TicketRequestInterface) {
    const options: HttpRequestConfigInterface = {
      hostname: config.dnsHTTP,
      port: +config.httpPorts.tickets,
      method: 'POST',
      path: '/api/v1/tickets'
    }

    return this.sendRequest(options, ticketRequest);
  }
}
