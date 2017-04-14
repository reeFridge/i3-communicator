import {Socket} from 'net';
import {IMessage} from './i-message';

export interface ICommunicator {
	connect(socketPath: string): Promise<Socket>;
	send(message: IMessage): Promise<IMessage>;
	pack(message: IMessage): Buffer;
	unpack(message: Buffer, magic: string): IMessage;
}
