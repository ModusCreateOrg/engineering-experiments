import {
	DynamoDB,
	SQS,
	S3,
} from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import {
	IRepository,
	IParams,
	IScanData,
} from './interfaces';

export abstract class BaseRepository implements IRepository {
	private readonly LIMIT_DEFAULT: number = 10;
	public readonly FILES_TABLE: string | undefined = process.env.FILES_ZIPPED_TABLE;
	public sqs;
	public S3;
	repository: any;

	constructor() {
		this.sqs = new SQS();
		this.S3  = new S3();
    this.repository = new DynamoDB.DocumentClient();
  }

	async scan(event: APIGatewayEvent): Promise<IScanData> {
    const data = await this.repository
												.scan(this.configureParams(event))
												.promise();
    return data;
  }

  protected configureParams(event: APIGatewayEvent): IParams {
    const params: IParams = {
      TableName: this.FILES_TABLE,
      Limit: this.LIMIT_DEFAULT,
      ExclusiveStartKey: { id: 'id' },
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

    return params;
  }

  async put(params: IParams) {
    await this.repository.put(params).promise();
  }

  async delete(params: IParams) {
  	await this.repository.delete(params).promise();
  }
}