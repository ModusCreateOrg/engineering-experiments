import { DynamoDB } from 'aws-sdk';
import {
	IHandle,
	IParams,
	IConnectionClass,
	IEvent,
} from './interfaces';

class OnDisconnect implements IConnectionClass {
	
	repository;

    constructor({repository}) {
        this.repository = repository;
    }

    async handle(event): Promise<IHandle> {
        const deleteParams: IParams = {
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

const ddb = new DynamoDB.DocumentClient();
const onDisconnect = new OnDisconnect({repository: ddb});
const handle = onDisconnect.handle.bind(onDisconnect);
export default handle;
