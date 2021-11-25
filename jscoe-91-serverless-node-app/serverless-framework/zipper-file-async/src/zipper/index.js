const { randomUUID } = require('crypto');
const AWS = require('aws-sdk');
const ZipHelper = require('./zip-helper');
const WebSocketClient = require('./websocket-client')

const FILES_TABLE = process.env.FILES_ZIPPED_TABLE;
const BUCKET = process.env.BUCKET;

class Zipper {

    constructor({ s3, sqs, repository, wsClient }) {
        this.S3 = s3;
        this.sqs = sqs;
        this.repository = repository;
        this.wsClient = wsClient
    }

    async handle(event) {
        const { body: keyS3File } = event.Records[0];
        const file = await this.getObjectS3(`unziped/${keyS3File}`);
        const zippedFile = await ZipHelper.zip(keyS3File, file.Body);
        await this.putObjectS3(zippedFile);
        await this.saveZipped(keyS3File);
        await this.wsClient.send(event)
    }

    async saveZipped(keyS3File) {
        const linkToDownload = `https://${BUCKET}.s3.amazonaws.com/zip/${keyS3File}.gz`
        const params = {
            TableName: FILES_TABLE,
            Item: {
                id: randomUUID(),
                filename: keyS3File,
                link: linkToDownload,
                createdAt: new Date().toISOString()
            }
        }

        try {
            await this.repository.put(params).promise();
        } catch (err) {
            console.log(`Error to put data into DynamoDB ${JSON.stringify(params)}`)
            throw err;
        }
    }

    getObjectS3(keyS3File) {
        return this.S3.getObject({
            Bucket: BUCKET,
            Key: keyS3File
        }).promise();
    }

    putObjectS3({ zippedFileKey, stream }) {
        return this.S3.putObject({
            Bucket: BUCKET,
            Key: zippedFileKey,
            ACL: 'public-read',
            Body: stream
        }).promise();
    }
}

const s3 = new AWS.S3()
const sqs = new AWS.SQS()
const ddb = new AWS.DynamoDB.DocumentClient();
const wsClient = new WebSocketClient({ repository: ddb });
const zipper = new Zipper({ s3, sqs, repository: ddb, wsClient });
module.exports.handle = zipper.handle.bind(zipper);