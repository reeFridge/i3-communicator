export interface IMessage {
	readonly magic: string;
	length: number;
	type: number;
	payload: string;
}
