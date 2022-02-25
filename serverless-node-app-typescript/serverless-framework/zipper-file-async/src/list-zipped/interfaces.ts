interface IQueryStringParams {
	limit: number;
	lastEvaluatedKey: string;	
}

export interface IEvent {
	queryStringParameters: IQueryStringParams;
}

interface IStartKey {
	id: string;
}

export interface IParams {
	TableName: string | undefined;
	Limit: number;
	ExclusiveStartKey: IStartKey;
}

interface IScan {
	scan(): Promise<IScan>;
}

export interface IApiList {
	repository: IScan;
}

export interface IHandle {
	statusCode: number;
	body: string;
}
