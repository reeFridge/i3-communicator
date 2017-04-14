import {IMessage} from '../interfaces/i-message';

export const MAGIC = 'i3-ipc';

export enum I3MessageType {
	COMMAND,
	GET_WORKSPACES,
	SUBSCRIBE,
	GET_OUTPUTS,
	GET_TREE,
	GET_MARKS,
	GET_BAR_CONFIG,
	GET_VERSION,
	GET_BINDING_MODES
}

export interface I3Message extends IMessage {
	type: I3MessageType;
}
