const AWS = require('aws-sdk');

class OnDisconnect {
    constructor() {
        this.ddb = new AWS.DynamoDB.DocumentClient();
    }

    async handle(event) {
        const deleteParams = {
            TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
            Key: {
                connectionId: event.requestContext.connectionId
            }
        };

        try {
            await this.ddb.delete(deleteParams).promise();
        } catch (err) {
            return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(err) };
        }

        return { statusCode: 200, body: 'Disconnected.' };
    }
}

const onDisconnect = new OnDisconnect();
module.exports.handle = onDisconnect.handle.bind(onDisconnect);