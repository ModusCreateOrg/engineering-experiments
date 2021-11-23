const AWS = require('aws-sdk');

const { CONNECTIONS_WEBSOCKET_TABLE } = process.env;

class OnMessage {
    constructor() {
        this.ddb = new AWS.DynamoDB.DocumentClient();
    }

    async handle(event) {
        console.log(`oN HANDLER`)
        let connectionData;

        try {
            connectionData = await this.ddb.scan({ TableName: CONNECTIONS_WEBSOCKET_TABLE, ProjectionExpression: 'connectionId' }).promise();
        } catch (err) {
            return { statusCode: 500, body: err.stack };
        }

        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
        });

        const postData = JSON.stringify(JSON.parse(event.body).data);

        const postCalls = connectionData.Items.map(async ({ connectionId }) => {
            try {
                await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
            } catch (err) {
                console.log(`error `, JSON.stringify(err))
                if (err.statusCode === 410) {
                    console.log(`Found stale connection, deleting ${connectionId}`);
                    await this.ddb.delete({ TableName: CONNECTIONS_WEBSOCKET_TABLE, Key: { connectionId } }).promise();
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
const onMessage = new OnMessage()
module.exports.handle = onMessage.handle.bind(onMessage);