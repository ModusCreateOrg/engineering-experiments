import { S3 } from 'aws-sdk';
import {
	APIGatewayEvent,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { getBoundary, Parse } from 'parse-multipart';
import { UploaderRepository } from '../repositories/';
import { IUploader } from './interfaces';

class Uploader implements IUploader {
	private readonly BUCKET = process.env.BUCKET;
	private readonly s3;
	private readonly repository: any;

  constructor() {
    this.s3 = new S3();
    this.repository = new UploaderRepository();
  }

  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      const { filename, data } = this.repository.extractFile(event ?? '');
      await this.s3.putObject({
        Bucket: this.BUCKET,
        Key: `unziped/${filename}`,
        ACL: 'public-read',
        Body: data,
      }).promise();

      await this.repository.notifyUpload({ filename });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Uploaded with successful!' }),
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.stack }),
      }
    }
  }
}

const uploader = new Uploader();
export const handle = uploader.handle.bind(uploader);
