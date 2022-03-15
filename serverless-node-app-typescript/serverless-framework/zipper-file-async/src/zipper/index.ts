import { S3, SQS, DynamoDB, } from 'aws-sdk';
import ZipHelper from './zip-helper';
import WebSocketClient from './websocket-client';
import { ZipperRepository } from '../repositories/';

class Zipper {
	private readonly repository;
	private readonly wsClient;

  constructor() {
    this.repository = new ZipperRepository();
    this.wsClient = new WebSocketClient({
    	repository: this.repository,
    });
  }

  async handle(event): Promise<void> {
    const { body: keyS3File } = event?.Records?.[0];
    const file = await this.repository.getObjectS3(`unziped/${keyS3File}`);
    const zippedFile = await ZipHelper.zip(keyS3File as string, file.Body as string);
    await this.repository.putObjectS3(zippedFile);
    await this.repository.saveZipped(keyS3File);
    await this.wsClient.send(event)
  }
}

const zipper = new Zipper();
export const handle = zipper.handle.bind(zipper);
