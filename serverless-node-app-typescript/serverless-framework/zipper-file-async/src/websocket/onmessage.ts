import {
	APIGatewayEvent,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { WebsocketRepository } from '../repositories/';
import { IConnectionClass } from './interfaces';

class OnMessage implements IConnectionClass {
	private readonly CONNECTIONS_WEBSOCKET_TABLE = process.env.CONNECTIONS_WEBSOCKET_TABLE;
	private readonly repository: any;

  constructor() {
    this.repository = new WebsocketRepository();
  }

  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      let connectionData = await this.repository.findConnections();
      const postCalls = this.repository.postMessages(event, connectionData.Items);
      await Promise.all(postCalls);
    } catch (err) {
      return { statusCode: 500, body: err.stack };
    }

    return { statusCode: 200, body: 'Data sent.' };
  }
}

const onMessage = new OnMessage();
export const handle = onMessage.handle.bind(onMessage);

