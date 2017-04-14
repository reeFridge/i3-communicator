import {Rect} from './rect';

export interface I3Output {
	name: string;
	active: boolean;
	current_workspace: string;
	rect: Rect;
}
