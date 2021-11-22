const AWS = require('aws-sdk');

const { CONNECTIONS_WEBSOCKET_TABLE } = process.env;

module.exports = class WebSocketClient {
    constructor() {
        this.ddb = new AWS.DynamoDB.DocumentClient();
    }

    async send(event) {
        console.log(`event ${JSON.stringify(event)}`)
        console.log(`event.requestContext: ${event.requestContext}`)

        let connectionData;

        try {
            connectionData = await this.ddb.scan({ TableName: CONNECTIONS_WEBSOCKET_TABLE, ProjectionExpression: 'connectionId' }).promise();
        } catch (err) {
            return { statusCode: 500, body: err.stack };
        }

        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            endpoint: process.env.WS_URL
        });

        const postData = JSON.stringify({message: "Uploaded file was zipped"});

        const postCalls = connectionData.Items.map(async ({ connectionId }) => {
            try {
                await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
            } catch (err) {
                console.log(JSON.stringify(err))
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
