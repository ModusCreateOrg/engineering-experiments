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
	constructor: Function;
	handle: Function;
	findConnections?: Function;
	postMessages?: Function;
}
