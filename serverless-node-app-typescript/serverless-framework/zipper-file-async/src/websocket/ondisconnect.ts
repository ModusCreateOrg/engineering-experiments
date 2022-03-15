import { DynamoDB } from 'aws-sdk';
import {
	APIGatewayEvent,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { WebsocketRepository } from '../repositories/';
import {
	IParams,
	IConnectionClass,
} from './interfaces';

class OnDisconnect implements IConnectionClass {
	
	private readonly repository: any;

  constructor() {
    this.repository = new WebsocketRepository();
  }

  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const deleteParams: IParams = {
      TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
      Key: {
        connectionId: event.requestContext.connectionId as string
      }
    };

    try {
      await this.repository.delete(deleteParams).promise();
    } catch (err) {
      return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(err) };
    }

    return { statusCode: 200, body: 'Disconnected.' };
  }
}

const onDisconnect = new OnDisconnect();
export const handle = onDisconnect.handle.bind(onDisconnect);
