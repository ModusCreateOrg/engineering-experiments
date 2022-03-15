import { ApiGatewayManagementApi } from 'aws-sdk';
import { BaseRepository } from './base-repository';
import { IParams } from './interfaces';

export class WebsocketRepository extends BaseRepository {
	private readonly CONNECTIONS_WEBSOCKET_TABLE = process.env.CONNECTIONS_WEBSOCKET_TABLE;

  async findConnections() {
    return this.repository.scan({
    	TableName: this.CONNECTIONS_WEBSOCKET_TABLE,
    	ProjectionExpression: 'connectionId',
    }).promise();
  }

  public postMessages(event, items) {
    const apigwManagementApi = new ApiGatewayManagementApi({
      endpoint: event?.requestContext?.domainName + '/' + event?.requestContext?.stage
    });
    const message: string = JSON.stringify(JSON.parse(event?.body)?.data);

    return items
      .map(async ({ connectionId }) => {
        try {
          await apigwManagementApi.postToConnection({
          	ConnectionId: connectionId,
          	Data: message,
          }).promise();
        } catch (err) {
          if (err.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            await this.repository.delete({
            	TableName: this.CONNECTIONS_WEBSOCKET_TABLE,
            	Key: {
            		connectionId
            	},
            }).promise();
          } else {
            throw err;
          }
        }
      });
  }
}
