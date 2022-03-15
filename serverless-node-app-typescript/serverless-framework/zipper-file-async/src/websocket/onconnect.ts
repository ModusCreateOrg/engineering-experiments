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

class OnConnect implements IConnectionClass {

	private readonly repository: any;

  constructor() {
    this.repository = new WebsocketRepository();
  }

  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const putParams: IParams = {
      TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
      Item: {
        connectionId: event.requestContext.connectionId as string
      }
    };

    try {
      await this.repository.put(putParams).promise();
    } catch (err) {
      return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
    }

    return { statusCode: 200, body: 'Connected.' };
  }
}

const onConnect = new OnConnect();
export const handle = onConnect.handle.bind(onConnect);
