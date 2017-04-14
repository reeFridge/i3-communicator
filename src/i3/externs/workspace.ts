import {Rect} from './rect';

export interface I3Workspace {
	num: number;
	name: string;
	visible: boolean;
	focused: boolean;
	urgent: boolean;
	rect: Rect;
	output: string;
}
