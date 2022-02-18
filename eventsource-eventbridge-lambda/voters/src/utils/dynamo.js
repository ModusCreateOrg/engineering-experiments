const {
  DynamoDBDocumentClient,
  BatchWriteCommand,
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const _ddbClient = new DynamoDBClient({ region: AWS_REGION });

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
const unmarshallOptions = {
  wrapNumbers: false,
};
const translateConfig = { marshallOptions, unmarshallOptions };
const _ddbDocClient = DynamoDBDocumentClient.from(_ddbClient, translateConfig);

exports.batchWrite = async (input) => {
  return _ddbDocClient.send(new BatchWriteCommand(input));
};

exports.delete = async (input) => {
  return _ddbDocClient.send(new DeleteCommand(input));
};

exports.get = async (input) => {
  return _ddbDocClient.send(new GetCommand(input));
};

exports.query = async (input) => {
  return _ddbDocClient.send(new QueryCommand(input));
};

exports.scan = async (input) => {
  return _ddbDocClient.send(new ScanCommand(input));
};

exports.put = async (input) => {
  return _ddbDocClient.send(new PutCommand(input));
};

exports.update = async (input) => {
  return _ddbDocClient.send(new UpdateCommand(input));
};
