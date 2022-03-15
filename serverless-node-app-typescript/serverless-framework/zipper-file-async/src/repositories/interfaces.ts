interface IScan {
	scan(): Promise<IScan>;
}

export interface IRepository {
  repository: IScan;
}

interface IStartKey {
	id: string;
}

interface IConnection {
	connectionId: string;
}

interface IItemValues {
	id: string;
  filename: string;
  link: string;
  createdAt: string;
}

export interface IParams {
	TableName?: string | undefined;
	Limit?: number | string;
	ExclusiveStartKey?: IStartKey;
	Item?: IConnection | IItemValues;
	Key?: IConnection;
}

export interface IS3Object {
	Bucket: string;
	Key: string;
	Body?: string;
}

export interface IPutObjectS3Values {
	Bucket: string;
	Key: string;
	ACL: string;
	Body: Buffer;
}

export interface IPutParams {
	zippedFileKey: string;
	stream: Buffer;
}

export interface IExtractFile {
	filename: string;
	data: string;
}

export interface IScanData {
	data: any;
}

export interface IFile {
	filename?: string;
	QueueUrl?: string;
	MessageBody?: string;
}
