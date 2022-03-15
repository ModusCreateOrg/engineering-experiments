export interface IZipValues {
	zippedFileKey: string;
  stream: Buffer;
}

export interface ISendValues {
	statusCode: number;
	body: string;
}