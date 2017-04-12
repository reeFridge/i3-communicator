import net = require('net');
import childProcess = require('child_process');
import console = require('console');
import path = require('path');

enum MessageType {
    COMMAND,
    GET_WORKSPACES,
    SUBSCRIBE,
    GET_OUTPUTS,
    GET_TREE,
    GET_MARKS,
    GET_BAR_CONFIG
}

enum EventType {
    WORKSPACE,
    OUTPUT
}

const MAGIC_STRING = 'i3-ipc';

interface IIPC {
    connect(socketPath: string): Promise<net.Socket>;
    send(type: MessageType, payload: string): void;
    packMessage(message: Ii3Message): Buffer;
    unpackMessage(messageBuff: Buffer): Ii3Message;
}

interface Ii3Message {
    length: number;
    type: MessageType;
    payload: string;
}

class IPC implements IIPC {
    private socket: net.Socket;

    connect(socketPath: string): Promise<net.Socket> {
        return new Promise((resolve, reject) => {
           this.socket = net.createConnection(socketPath);
           this.socket.on('connect', () => resolve(this.socket));
           this.socket.on('error', (err) => reject(err));
        });
    }

    send(type: MessageType, payload: string): void {
        this.socket.write(this.packMessage({
            length: Buffer.byteLength(payload),
            type: type,
            payload: payload
        }));
    }

    packMessage(message: Ii3Message): Buffer {
        const length = Buffer.byteLength(MAGIC_STRING) + 8 + message.length;
        const buff = new Buffer(length);
        let offset: number;

        offset = buff.write(MAGIC_STRING);
        offset = buff.writeInt32LE(message.length, offset);
        offset = buff.writeInt32LE(message.type as number, offset);
        buff.write(message.payload, offset);

        return buff;
    }

    unpackMessage(messageBuff: Buffer): Ii3Message {
        const length = messageBuff.readInt32LE(Buffer.byteLength(MAGIC_STRING));
        return {
            length: length,
            type: messageBuff.readInt32LE(10),
            payload: messageBuff.slice(Buffer.byteLength(MAGIC_STRING) + 8).toString()
        };
    }
}

const ipc: IIPC = new IPC();

const sockPath = path.normalize(
    childProcess
        .execSync('i3 --get-socketpath')
        .toString('utf-8')
        .trim()
);

ipc.connect(sockPath)
    .then((socket: net.Socket) => {
        console.log('Successfully connected to i3-ipc interface.');

        socket.on('data', (data: Buffer) => {
           const message = ipc.unpackMessage(data);
           console.log('reply:', message);
        });

        ipc.send(MessageType.COMMAND, 'exec shutter');
    }, (error) => {
        console.log(`Error occurs: ${error}`);
    });
