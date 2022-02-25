import { S3, SQS } from 'aws-sdk';
import parseMultipart from 'parse-multipart';
import {
	IEvent,
	IExtractFile,
	IFile,
	IHandle,
	IUploader,
} from './interfaces';

const BUCKET = process.env.BUCKET;
const QUEUE_ZIP_FILE = process.env.QUEUE_ZIP_FILE;

class Uploader implements IUploader {
	s3;
	sqs;

  constructor({ s3, sqs }) {
    this.s3 = s3;
    this.sqs = sqs;
  }

  async handle(event: IEvent): Promise<IHandle> {
    console.log('Size');
    console.log(JSON.stringify(event.body.length));
    try {
      const { filename, data }: IExtractFile = this.extractFile(event);
      console.log('asjdkajshdkjsa');
      await this.s3.putObject({
        Bucket: BUCKET,
        Key: `unziped/${filename}`,
        ACL: 'public-read',
        Body: data
      }).promise();

      await this.notifyUpload({ filename } as IFile);

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

  extractFile(event: IEvent): IExtractFile {
    const boundary = parseMultipart.getBoundary(event.headers['content-type'])
    const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
    const [{ filename, data }]: IExtractFile[] = parts;
    const keyToSave: string = Buffer.from(filename, 'ascii').toString();

    return {
      filename: keyToSave,
      data
    }
  }

  async notifyUpload({ filename }: IFile) {
    console.log(`Queu ${QUEUE_ZIP_FILE}`)
    const { QueueUrl }: IFile = await this.sqs.getQueueUrl({ QueueName: QUEUE_ZIP_FILE }).promise();
    await this.sqs.sendMessage({ QueueUrl, MessageBody: filename } as IFile).promise();
    console.log('Messge sent')
  }
}

const s3 = new S3();
const sqs = new SQS();
const uploader = new Uploader({ s3, sqs })
const handle = uploader.handle.bind(uploader)
export default handle;
