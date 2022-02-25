interface IHeaders {
	'content-type': string;
}

export interface IEvent {
	headers: IHeaders;
	body: string,
}

export interface IExtractFile {
	filename: string;
	data: string;
}

export interface IFile {
	filename?: string;
	QueueUrl?: string;
	MessageBody?: string;
}

export interface IHandle {
	statusCode: number;
	body: string;
}

interface IPutObject {
	putObject(): Promise<IPutObject>;
}

interface ISendMessage {
	sendMessage(): Promise<ISendMessage>;
}

export interface IUploader {
	s3: IPutObject;
	sqs: ISendMessage;
}
