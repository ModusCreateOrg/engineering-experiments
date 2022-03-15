const AWS = require('aws-sdk');
const parseMultipart = require('parse-multipart');

const BUCKET = process.env.BUCKET;
const QUEUE_ZIP_FILE = process.env.QUEUE_ZIP_FILE;

class Uploader {
  constructor({ s3, sqs }) {
    this.s3 = s3;
    this.sqs = sqs;
  }

  async handle(event) {
    console.log('functional handle event:', event);
    // console.log(JSON.stringify(event.body.length));
    try {
      const { filename, data } = this.extractFile(event)

      await this.s3.putObject({
        Bucket: BUCKET,
        Key: `unziped/${filename}`,
        ACL: 'public-read',
        Body: data
      }).promise();

      await this.notifyUpload({ filename })

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Uploaded with successful!' })
      }
    } catch (err) {
      console.log(err.stack)
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.stack })
      }
    }
  }

  extractFile(event) {
  	console.log('functional extractFile event:', event);
    const boundary = parseMultipart.getBoundary(event.headers['content-type'])
    const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
    const [{ filename, data }] = parts
    const keyToSave = Buffer.from(filename, 'ascii').toString()

    return {
      filename: keyToSave,
      data
    }
  }

  async notifyUpload({ filename }) {
    console.log(`Queu ${QUEUE_ZIP_FILE}`)
    const { QueueUrl } = await this.sqs.getQueueUrl({ QueueName: QUEUE_ZIP_FILE }).promise();
    await this.sqs.sendMessage({ QueueUrl, MessageBody: filename }).promise();
    console.log('Messge sent')
  }
}

const s3 = new AWS.S3();
const sqs = new AWS.SQS();
const uploader = new Uploader({ s3, sqs })
module.exports.handle = uploader.handle.bind(uploader)
