const AWS = require('aws-sdk');

class OnConnect {
    constructor() {
        this.ddb = new AWS.DynamoDB.DocumentClient();
    }

    async handle(event, context, cb) {
        const putParams = {
            TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
            Item: {
                connectionId: event.requestContext.connectionId
            }
        };

        try {
            await this.ddb.put(putParams).promise();
        } catch (err) {
            console.log(err.stack)
            return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
        }

        return { statusCode: 200, body: 'Connected.' };
    }
}

const onConnect = new OnConnect();
module.exports.handle = onConnect.handle.bind(onConnect);