import { ApiGatewayManagementApi } from 'aws-sdk';
import { BaseRepository } from './base-repository';
import { randomUUID } from 'crypto';

import {
	IS3Object,
	IPutParams,
	IPutObjectS3Values,
	IParams,
} from './interfaces';

export class ZipperRepository extends BaseRepository {
	private readonly BUCKET = process.env.BUCKET;

	public getObjectS3(keyS3File: string): Promise<IS3Object> {
    return this.S3.getObject({
      Bucket: this.BUCKET,
      Key: keyS3File,
    }).promise();
  }

  public putObjectS3({ zippedFileKey, stream }: IPutParams): Promise<IPutObjectS3Values> {
    return this.S3.putObject({
      Bucket: this.BUCKET,
      Key: zippedFileKey,
      ACL: 'public-read',
      Body: stream,
    }).promise();
  }

  async saveZipped(keyS3File: string): Promise<void> {
    const linkToDownload: string = `https://${this.BUCKET}.s3.amazoncom/zip/${keyS3File}.gz`;
    const params: IParams = {
      TableName: this.FILES_TABLE,
      Item: {
        id: randomUUID(),
        filename: keyS3File,
        link: linkToDownload,
        createdAt: new Date().toISOString(),
      }
    };

    try {
      await this.repository.put(params).promise();
    } catch (err) {
      console.log(`Error to put data into DynamoDB ${JSON.stringify(params)}`)
      throw err;
    }
  }

  async postCalls({ ConnectionId }) {
  	const postData = JSON.stringify({
	  	message: 'Uploaded file was zipped',
	  });

	  const apigwManagementApi = new ApiGatewayManagementApi({
      endpoint: process.env.WS_URL
    });

  	await apigwManagementApi.postToConnection({
    	ConnectionId,
    	Data: postData,
    }).promise();
  }
}
