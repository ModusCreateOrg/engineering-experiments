import { DynamoDB } from 'aws-sdk';
import {
	IHandle,
	IParams,
	IConnectionClass,
	IEvent,
} from './interfaces';

class OnConnect implements IConnectionClass {

	repository;

    constructor({repository}) {
        this.repository = repository
    }

    async handle(event): Promise<IHandle> {
        const putParams: IParams = {
            TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
            Item: {
                connectionId: event.requestContext.connectionId
            }
        };

        try {
            await this.repository.put(putParams).promise();
        } catch (err) {
            return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
        }

        return { statusCode: 200, body: 'Connected.' };
    }
}

const ddb = new DynamoDB.DocumentClient();
const onConnect = new OnConnect({repository: ddb});
const handle = onConnect.handle.bind(onConnect);
export default handle;
