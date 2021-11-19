const AWS = require('aws-sdk');
const FILES_TABLE = process.env.FILES_ZIPPED_TABLE;

class ApiList {
    constructor() {
        this.ddb = new AWS.DynamoDB.DocumentClient();
    }

    async handle(event, context) {
        try {
            const data = await this.ddb.scan(this.configureParams(event)).promise()
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items)
            }
        } catch (err) {
            console.log(`Failed to retrieve data from dynamoDb: ${err.stack}`)
            throw err
        }
    }

    configureParams(event) {
        const { limit, lastEvaluatedKey } = event.queryStringParameters
        const params = {
            TableName: FILES_TABLE,
            Limit: limit
        }

        if (lastEvaluatedKey) {
            params.ExclusiveStartKey = { id: lastEvaluatedKey }
        }

        return params
    }
}

const apiList = new ApiList()
module.exports.handle = apiList.handle.bind(apiList)