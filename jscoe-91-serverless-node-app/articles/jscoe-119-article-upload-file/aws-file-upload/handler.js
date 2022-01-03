const AWS = require('aws-sdk');
const parseMultipart = require('parse-multipart');

const BUCKET = process.env.BUCKET;

const s3 = new AWS.S3();

module.exports.handle = async (event) => {
  try {
    const { filename, data } = extractFile(event)
    await s3.putObject({ Bucket: BUCKET, Key: filename, ACL: 'public-read', Body: data }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ link: `https://${BUCKET}.s3.amazonaws.com/${filename}` })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack })
    }
  }
}

function extractFile(event) {
  const boundary = parseMultipart.getBoundary(event.headers['content-type'])
  const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
  const [{ filename, data }] = parts

  return {
    filename,
    data
  }
}

