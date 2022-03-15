import { APIGatewayEvent } from 'aws-lambda';
import { BaseRepository } from './base-repository';
import { getBoundary, Parse } from 'parse-multipart';

import {
	IExtractFile,
	IFile,
} from './interfaces';

export class UploaderRepository extends BaseRepository {
	private readonly QUEUE_ZIP_FILE = process.env.QUEUE_ZIP_FILE;

	public extractFile(event: APIGatewayEvent): IExtractFile {
  	// @ts-ignore
    const boundary: string = getBoundary(event.headers['content-type']);
    // @ts-ignore
    const parts = Parse(Buffer.from(event.body, 'base64'), boundary);
    const [{ filename, data }]: IExtractFile[] = parts;
    const keyToSave: string = Buffer.from(filename, 'ascii').toString();

    return {
      filename: keyToSave,
      data,
    }
  }

  async notifyUpload({ filename }: IFile) {
    console.log(`Queu ${this.QUEUE_ZIP_FILE}`);
    const { QueueUrl }: IFile = await this.sqs.getQueueUrl({ QueueName: this.QUEUE_ZIP_FILE }).promise();
    await this.sqs.sendMessage({ QueueUrl, MessageBody: filename } as IFile).promise();
    console.log('Messge sent');
  }
}
