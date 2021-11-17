const { randomUUID } = require('crypto');
const AWS = require('aws-sdk');
const ZipHelper = require('./zipHelper');

const FILES_TABLE = process.env.FILES_ZIPPED_TABLE;
const BUCKET = process.env.BUCKET;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

class Zipper {
    constructor() {
        this.S3 = new AWS.S3();
        this.sqs = new AWS.SQS();
    }

    async handle(event) {
        const { body: keyS3File } = event.Records[0];
        const file = await this.getObjectS3(`unziped/${keyS3File}`);
        const zippedFile = await ZipHelper.zip(keyS3File, file.Body);
        await this.putObjectS3(zippedFile);
        await this.saveZipped(keyS3File);
    }

    async saveZipped(keyS3File) {
        const linkToDownload = `https://${BUCKET}.s3.amazonaws.com/zip/${keyS3File}`
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
            await dynamoDbClient.put(params).promise();
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

const zipper = new Zipper();
module.exports.handle = zipper.handle.bind(zipper);