import {IMessage} from './i-message';

export enum I3ReplyType {
	COMMAND,
	WORKSPACES,
	SUBSCRIBE,
	OUTPUTS,
	TREE,
	MARKS,
	BAR_CONFIG,
	VERSION,
	BINDING_MODES
}

export interface I3Reply extends IMessage{
	type: I3ReplyType;
}
