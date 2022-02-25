interface IBody {
	data: string;
}

interface IRequestContext {
	connectionId?: string | undefined;
	domainName?: string | undefined;
	stage?: string | undefined;
}

export interface IEvent {
	requestContext?: IRequestContext | undefined;
	body?: string | undefined;
}

export interface IHandle {
	statusCode: number;
	body: string;
}

interface IConnection {
	connectionId: string;
}

export interface IParams {
	TableName: string | undefined;
	Item?: IConnection;
	Key?: IConnection;
}

interface IOperation {
	put(): Promise<IOperation>;
	delete(): Promise<IOperation>;
}

export interface IConnectionClass {
	repository: IOperation;
}
