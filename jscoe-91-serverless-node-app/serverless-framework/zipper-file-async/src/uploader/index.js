const AWS = require('aws-sdk');
const parseMultipart = require('parse-multipart')

class Uploader {
  constructor() {
    this.S3 = new AWS.S3();
    this.sqs = new AWS.SQS();
  }

  async handle(event) {
    const boundary = parseMultipart.getBoundary(event.headers['content-type'])
    const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
    const [{ filename, data }] = parts
    const keyToSave = Buffer.from(filename, 'ascii').toString()

    try {
      await this.S3.putObject({
        Bucket: 'modusland',
        Key: `unziped/${keyToSave}`,
        ACL: 'public-read',
        Body: data
      }).promise()

      const QueueName = 'ZipFile'
      const MessageBody = keyToSave
      const { QueueUrl } = await this.sqs.getQueueUrl({ QueueName }).promise()
      await this.sqs.sendMessage({ QueueUrl, MessageBody }).promise()

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Uploaded with successful!' })
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message })
      }
    }
  }
}

const uploader = new Uploader()
module.exports.handle = uploader.handle.bind(uploader)
