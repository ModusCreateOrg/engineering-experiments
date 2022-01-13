import * as http from 'http';
import { HttpRequestConfigInterface } from '../shared/interfaces/client.interface';
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

  async getEventInfo(eventId: number) {
    const options: HttpRequestConfigInterface = {
      hostname: config.dns,
      port: +config.ports.events,
      method: 'GET',
      path: `/api/v1/events/${eventId}`
    }

    const response: any = await this.sendRequest(options);

    return {
      id: response.id,
      name: response.name
    };
  }

  async getAttendeeInfo(invoiceId: number) {
    const options: HttpRequestConfigInterface = {
      hostname: config.dns,
      port: +config.ports.invoices,
      method: 'GET',
      path: `/api/v1/invoices/${invoiceId}`
    }

    const response: any = await this.sendRequest(options);

    return {
      id: response.id,
      attendee: response.addressee
    };
  }
}
