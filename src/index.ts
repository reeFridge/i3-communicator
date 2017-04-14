import {Socket} from 'net';
import {execSync} from 'child_process';
import console = require('console');
import path = require('path');
import Communicator from './communicator';
import {I3Message, I3MessageType, MAGIC} from './i3/i3-message';
import {I3Reply} from './i3/i3-reply';
import I3MessageBuilder from './i3/i3-message-builder';

const comm = new Communicator<I3Message>();

const socketPath = path.normalize(
	execSync('i3 --get-socketpath')
		.toString('utf-8')
		.trim()
);

comm.connect(socketPath)
	.then((socket: Socket) => {
		console.log('Successfully connected to i3-ipc interface.');

		const execMessage = new I3MessageBuilder()
			.type(I3MessageType.COMMAND)
			.payload('exec shutter')
			.build();

		console.log('send:', execMessage.payload);

		comm.send(execMessage)
			.then((reply: I3Reply) => {
				console.log('reply:', reply.payload);
			});
	}, (error) => {
		console.log(`Error occurs: ${error}`);
	});
