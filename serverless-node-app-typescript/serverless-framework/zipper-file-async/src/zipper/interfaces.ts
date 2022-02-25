// export interface IConnectionClass {
// 	repository: IOperation;
// }

interface IRecords {
	body: string;
}

export interface IEvent {
	Records: IRecords[];
}

export interface IS3Object {
	Bucket: string;
	Key: string;
	Body?: string;
}

export interface IPutParams {
	zippedFileKey: string;
	stream: Buffer;
}

export interface IPutObjectS3Values {
	Bucket: string;
	Key: string;
	ACL: string;
	Body: Buffer;
}

interface IItemValues {
	id: string;
  filename: string;
  link: string;
  createdAt: string;
}

export interface IParams {
	TableName: string | undefined;
	Item: IItemValues;
}

export interface IZipValues {
	zippedFileKey: string;
  stream: Buffer;
}

export interface ISendValues {
	statusCode: number;
	body: string;
}