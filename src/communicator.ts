import {ICommunicator} from './interfaces/i-communicator';
import {IMessage} from './interfaces/i-message';
import * as net from 'net';

export default class Communicator<M extends IMessage> implements ICommunicator {
	private socket: net.Socket;

	connect(socketPath: string): Promise<net.Socket> {
		return new Promise((resolve, reject) => {
			this.socket = net.createConnection(socketPath);
			this.socket.on('connect', () => resolve(this.socket));
			this.socket.on('error', (err) => reject(err));
		});
	}

	send(message: M): Promise<IMessage> {
		return new Promise((resolve, reject) => {
			const messageBuff = this.pack(message);

			this.socket.write(messageBuff);

			this.socket.on('data', (data: Buffer) => {
				// TODO: Remove hardcoded magic-string
				resolve(this.unpack(data, 'i3-ipc'));
			});

			this.socket.on('error', (err) => {
				reject(err);
			});
		});
	};

	pack(message: M): Buffer {
		const length = Buffer.byteLength(message.magic) + 8 + message.length;
		const buff = new Buffer(length);
		let offset: number;

		offset = buff.write(message.magic);
		offset = buff.writeInt32LE(message.length, offset);
		offset = buff.writeInt32LE(message.type as number, offset);
		buff.write(message.payload, offset);

		return buff;
	}

	unpack(messageBuff: Buffer, magic: string): IMessage {
		const magicLength = Buffer.byteLength(magic);
		const length = messageBuff.readInt32LE(magicLength);

		return {
			magic: magic,
			length: length,
			type: messageBuff.readInt32LE(10),
			payload: messageBuff.slice(magicLength + 8).toString()
		};
	}
}
