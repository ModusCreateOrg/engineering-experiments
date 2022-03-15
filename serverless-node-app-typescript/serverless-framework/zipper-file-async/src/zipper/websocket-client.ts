import { ApiGatewayManagementApi } from 'aws-sdk';
import { ZipperRepository } from '../repositories/';
import { ISendValues } from './interfaces';

export default class WebSocketClient {
	private readonly CONNECTIONS_WEBSOCKET_TABLE = process.env.CONNECTIONS_WEBSOCKET_TABLE;
	private readonly repository: any;

  constructor({ repository }) {
    this.repository = new ZipperRepository();
  }

  async send(): Promise<ISendValues> {
    let connectionData;

    try {
      connectionData = await this.repository.scan({
      	TableName: this.CONNECTIONS_WEBSOCKET_TABLE,
      	ProjectionExpression: 'connectionId'
      }).promise();
    } catch (err) {
      return {
      	statusCode: 500,
      	body: err.stack,
      };
    }
    
    const postCalls = connectionData.Items.map(async ({ connectionId }) => {
      try {
      	await this.repository.postCalls({
      		ConnectionId: connectionId,
      	});

        await this.repository.postCalls({ ConnectionId: connectionId });
      } catch (err) {
        if (err.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connectionId}`);
          await this.repository.delete({
          	TableName: this.CONNECTIONS_WEBSOCKET_TABLE,
          	Key: {
          		connectionId,
          	},
          }).promise();
        } else {
          throw err;
        }
      }
    });

    try {
      await Promise.all(postCalls);
    } catch (err) {
      return { statusCode: 500, body: err.stack };
    }

    return { statusCode: 200, body: 'Data sent.' };
  }
}
