const AWS = require('aws-sdk');

class OnDisconnect {
    constructor({repository}) {
        this.repository = repository;
    }

    async handle(event) {
        const deleteParams = {
            TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
            Key: {
                connectionId: event.requestContext.connectionId
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

const ddb = new AWS.DynamoDB.DocumentClient();
const onDisconnect = new OnDisconnect({repository: ddb});
module.exports.handle = onDisconnect.handle.bind(onDisconnect);