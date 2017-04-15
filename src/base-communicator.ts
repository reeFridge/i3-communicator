import {ICommunicator} from './interfaces/i-communicator';
import {IMessage} from './interfaces/i-message';
import * as net from 'net';

export default class BaseCommunicator<M extends IMessage> implements ICommunicator {
	private socket: net.Socket;
	readonly magic: string;

	constructor(magic: string) {
		this.magic = magic;
	}

	connect(socketPath: string): Promise<net.Socket> {
		this.socket = net.createConnection(socketPath);

		return new Promise((resolve, reject) => {
			this.socket.on('connect', () => resolve(this.socket));
			this.socket.on('error', (err) => reject(err));
		});
	}

	send(message: M): Promise<IMessage> {
		this.socket.write(this.pack(message));

		return new Promise((resolve, reject) => {
			this.socket.on('data', (data: Buffer) => {
				resolve(this.unpack(data));
			});

			this.socket.on('error', (err) => reject(err));
		});
	};

	pack(message: M): Buffer {
		const length = Buffer.byteLength(this.magic) + 8 + message.length;
		const buff = new Buffer(length);
		let offset: number;

		offset = buff.write(this.magic);
		offset = buff.writeInt32LE(message.length, offset);
		offset = buff.writeInt32LE(message.type as number, offset);
		buff.write(message.payload, offset);

		return buff;
	}

	unpack(messageBuff: Buffer): IMessage {
		const magicLength = Buffer.byteLength(this.magic);
		const length = messageBuff.readInt32LE(magicLength);

		return {
			length: length,
			type: messageBuff.readInt32LE(10),
			payload: messageBuff.slice(magicLength + 8).toString()
		};
	}
}
