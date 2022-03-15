interface IPutObject {
	putObject(): Promise<IPutObject>;
}

export interface IUploader {
	s3: IPutObject;
	constructor: Function;
	handle: Function;
}
