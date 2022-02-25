import { randomUUID } from 'crypto';
import { S3, SQS, DynamoDB, } from 'aws-sdk';
import ZipHelper from './zip-helper';
import WebSocketClient from './websocket-client';
import {
	IEvent,
	IS3Object,
	IPutObjectS3Values,
	IPutParams,
	IParams,
} from './interfaces';

const FILES_TABLE = process.env.FILES_ZIPPED_TABLE;
const BUCKET = process.env.BUCKET;

class Zipper {

	S3;
	sqs;
	repository;
	wsClient;

    constructor({ s3, sqs, repository, wsClient }) {
        this.S3 = s3;
        this.sqs = sqs;
        this.repository = repository;
        this.wsClient = wsClient
    }

    async handle(event: IEvent): Promise<void> {
        const { body: keyS3File } = event.Records[0];
        const file = await this.getObjectS3(`unziped/${keyS3File}`);
        const zippedFile = await ZipHelper.zip(keyS3File as string, file.Body as string);
        await this.putObjectS3(zippedFile);
        await this.saveZipped(keyS3File);
        await this.wsClient.send(event)
    }

    async saveZipped(keyS3File: string): Promise<void> {
        const linkToDownload: string = `https://${BUCKET}.s3.amazoncom/zip/${keyS3File}.gz`;
        const params: IParams = {
            TableName: FILES_TABLE,
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

    getObjectS3(keyS3File: string): Promise<IS3Object> {
        return this.S3.getObject({
            Bucket: BUCKET,
            Key: keyS3File
        }).promise();
    }

    putObjectS3({ zippedFileKey, stream }: IPutParams): Promise<IPutObjectS3Values> {
        return this.S3.putObject({
            Bucket: BUCKET,
            Key: zippedFileKey,
            ACL: 'public-read',
            Body: stream
        }).promise();
    }
}

const s3 = new S3();
const sqs = new SQS();
const ddb = new DynamoDB.DocumentClient();
const wsClient = new WebSocketClient({ repository: ddb });
const zipper = new Zipper({ s3, sqs, repository: ddb, wsClient });
const handle = zipper.handle.bind(zipper);
export default handle;