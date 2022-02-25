import {
	DynamoDB,
	ApiGatewayManagementApi,
} from 'aws-sdk';

import {
	IEvent,
	IHandle,
	IConnectionClass,
} from './interfaces';

const { CONNECTIONS_WEBSOCKET_TABLE } = process.env;

class OnMessage implements IConnectionClass {

	repository;

    constructor({ repository }) {
        this.repository = repository;
    }

    async handle(event: IEvent): Promise<IHandle> {
        try {
            let connectionData = await this.findConnections();
            const postCalls = this.postMessages(event, connectionData.Items);
            await Promise.all(postCalls);
        } catch (err) {
            return { statusCode: 500, body: err.stack };
        }

        return { statusCode: 200, body: 'Data sent.' };
    }

    async findConnections() {
        return this.repository.scan({ TableName: CONNECTIONS_WEBSOCKET_TABLE, ProjectionExpression: 'connectionId' }).promise();
    }

    postMessages(event, items) {
        const apigwManagementApi = new ApiGatewayManagementApi({
            endpoint: event?.requestContext?.domainName + '/' + event?.requestContext?.stage
        });

        // let message: string;

        // if (event === undefined) throw new Error("Unexpected error: Missing event");

        // const message = (event) ? JSON.stringify(JSON.parse(event?.body)?.data) : undefined;
        const message: string = JSON.stringify(JSON.parse(event?.body)?.data);

        return items
            .map(async ({ connectionId }) => {
                try {
                    await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: message }).promise();
                } catch (err) {
                    if (err.statusCode === 410) {
                        console.log(`Found stale connection, deleting ${connectionId}`);
                        await this.repository.delete({ TableName: CONNECTIONS_WEBSOCKET_TABLE, Key: { connectionId } }).promise();
                    } else {
                        throw err;
                    }
                }
            });
    }

}
const ddb = new DynamoDB.DocumentClient();
const onMessage = new OnMessage({ repository: ddb });
const handle = onMessage.handle.bind(onMessage);
export default handle;
