import { DynamoDB } from 'aws-sdk';
import {
	IEvent,
	IParams,
	IApiList,
	IHandle,
} from './interfaces';
const FILES_TABLE = process.env.FILES_ZIPPED_TABLE;
const LIMIT_DEFAULT: number = 10;

class ApiList implements IApiList {

	repository;

    constructor({ repository }) {
        this.repository = repository;
    }

    async handle(event: IEvent): Promise<IHandle> {
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

    configureParams(event: IEvent): IParams {
        const params: IParams = {
            TableName: FILES_TABLE,
            Limit: LIMIT_DEFAULT,
            ExclusiveStartKey: { id: '' },
        };
        
        if(event.queryStringParameters) {
            if (event.queryStringParameters.limit) {
                params.Limit = event.queryStringParameters.limit;
            }
            
            if (event.queryStringParameters.lastEvaluatedKey) {
                params.ExclusiveStartKey = {
                	id: event.queryStringParameters.lastEvaluatedKey as string,
                };
            }
        }

        return params
    }
}

const ddb = new DynamoDB.DocumentClient();
const apiList = new ApiList({ repository: ddb });
const handle = apiList.handle.bind(apiList);
export default handle;
