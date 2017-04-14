import {Rect} from './rect';

export type ContainerType = 'root' | 'output' | 'con' | 'floating_con' | 'workspace' | 'dockarea';
export type BorderType = 'normal' | 'none' | 'pixel';
export type LayoutType = 'splith' | 'splitv' | 'stacked' | 'tabbed' | 'dockarea' | 'output';
export type OrientationType = 'none' | 'horizontal' | 'vertical';

export interface I3Container {
	id: number;
	name: string;
	type: ContainerType;
	border: BorderType;
	current_border_width: number;
	layout: LayoutType;
	orientation: OrientationType;
	percent: number | null;
	rect: Rect;
	window_rect: Rect;
	deco_rect: Rect;
	geometry: Rect;
	window: number;
	urgent: boolean;
	focused: boolean;
}
