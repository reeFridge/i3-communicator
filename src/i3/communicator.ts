import BaseCommunicator from '../base-communicator';
import {I3Message, I3MessageType, MAGIC} from './message';
import {I3Reply} from './reply';
import {I3Result} from './externs/result';
import I3MessageBuilder from './message-builder';
import {I3Workspace} from "./externs/workspace";

export default class I3Communicator extends BaseCommunicator<I3Message> {
	constructor() {
		super(MAGIC);
	}

	command(instructions: string): Promise<I3Result[]> {
		return this.send(
			new I3MessageBuilder()
				.type(I3MessageType.COMMAND)
				.payload(instructions)
				.build()
		).then(
			(reply: I3Reply) => JSON.parse(reply.payload) as I3Result[]
		);
	}

	getWorkspaces(): Promise<I3Workspace[]> {
		return this.send(
			new I3MessageBuilder()
				.type(I3MessageType.GET_WORKSPACES)
				.build()
		).then(
			(reply: I3Reply) => JSON.parse(reply.payload) as I3Workspace[]
		);
	}
}
