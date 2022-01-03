const AWS = require('aws-sdk');

const { CONNECTIONS_WEBSOCKET_TABLE } = process.env;

class OnMessage {
    constructor({ repository }) {
        this.repository = repository;
    }

    async handle(event) {
        try {
            let connectionData = await this.findConnections();
            const postCalls = this.postMessages(event, connectionData.Items);
            await Promise.all(postCalls);
        } catch (err) {
            return {
                statusCode: 500,
                body: err.stack
            };
        }

        return { statusCode: 200 };
    }

    async findConnections() {
        return this.repository.scan({ TableName: CONNECTIONS_WEBSOCKET_TABLE, ProjectionExpression: 'connectionId' }).promise();
    }

    postMessages(event, items) {
        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
        });

        const message = JSON.stringify(JSON.parse(event.body).data);

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
const ddb = new AWS.DynamoDB.DocumentClient();
const onMessage = new OnMessage({ repository: ddb });
module.exports.handle = onMessage.handle.bind(onMessage);