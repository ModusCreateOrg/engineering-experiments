const AWS = require('aws-sdk');
const parseMultipart = require('parse-multipart');

const BUCKET = process.env.BUCKET;
const QUEUE_ZIP_FILE = process.env.QUEUE_ZIP_FILE;

class Uploader {
  constructor() {
    this.S3 = new AWS.S3();
    this.sqs = new AWS.SQS();
  }

  async handle(event) {

    const { filename, data } = this.extractFile(event)

    try {
      await this.S3.putObject({
        Bucket: BUCKET,
        Key: `unziped/${filename}`,
        ACL: 'public-read',
        Body: data
      }).promise();

      const QueueName = QUEUE_ZIP_FILE;
      const MessageBody = keyToSave;
      const { QueueUrl } = await this.sqs.getQueueUrl({ QueueName }).promise();
      await this.sqs.sendMessage({ QueueUrl, MessageBody }).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Uploaded with successful!' })
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.stack })
      }
    }
  }

  extractFile(event) {
    const boundary = parseMultipart.getBoundary(event.headers['content-type'])
    const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
    const [{ filename, data }] = parts
    const keyToSave = Buffer.from(filename, 'ascii').toString()

    return {
      filename: keyToSave,
      data
    }
  }
}

const uploader = new Uploader()
module.exports.handle = uploader.handle.bind(uploader)
