import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IApiList } from './interfaces';
import { ListZippedRepository } from '../repositories/index';

class ApiList implements IApiList {
	private readonly repository: any;

  constructor() {
  	this.repository = new ListZippedRepository();
  }

  public async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      const data = await this.repository.scan(event);
      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
      }
    } catch (err) {
      console.log(`Failed to retrieve data from dynamoDb: ${err.stack}`);
      throw err;
    }
  }
}

const apiList = new ApiList();
export const handle = apiList.handle.bind(apiList);
