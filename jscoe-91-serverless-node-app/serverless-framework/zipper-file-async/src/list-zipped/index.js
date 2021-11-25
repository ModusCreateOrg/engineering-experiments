const AWS = require('aws-sdk');
const FILES_TABLE = process.env.FILES_ZIPPED_TABLE;
const LIMIT_DEFAULT = 10;

class ApiList {

    constructor({ repository }) {
        this.repository = repository;
    }

    async handle(event) {
        try {
            const data = await this.repository.scan(this.configureParams(event)).promise()
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
        const params = {
            TableName: FILES_TABLE,
            Limit: LIMIT_DEFAULT
        }
        
        if(event.queryStringParameters) {
            if (event.queryStringParameters.limit) {
                params.Limit = event.queryStringParameters.limit;
            }
            
            if (event.queryStringParameters.lastEvaluatedKey) {
                params.ExclusiveStartKey = { id: lastEvaluatedKey }
            }
        }

        return params
    }
}

const ddb = new AWS.DynamoDB.DocumentClient();
const apiList = new ApiList({ repository: ddb })
module.exports.handle = apiList.handle.bind(apiList)