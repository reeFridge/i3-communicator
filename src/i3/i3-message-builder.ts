import {I3Message, I3MessageType} from './i3-message';

export default class I3MessageBuilder {
	private message: I3Message;

	constructor() {
		this.message = {
			length: 0,
			type: I3MessageType.COMMAND,
			payload: ''
		};
	}

	type(t: I3MessageType): I3MessageBuilder {
		this.message.type = t;

		return this;
	}

	payload(p: string): I3MessageBuilder {
		this.message.payload = p;
		this.message.length = Buffer.byteLength(p);

		return this;
	}

	build(): I3Message {
		return this.message;
	}
}
