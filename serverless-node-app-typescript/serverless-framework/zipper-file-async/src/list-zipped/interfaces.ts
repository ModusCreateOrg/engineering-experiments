interface IScan {
	scan(): Promise<IScan>;
}

export interface IApiList {
	repository: IScan;
	constructor: Function;
	handle: Function;
}
