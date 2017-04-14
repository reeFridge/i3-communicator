export type ModeType = 'dock' | 'hide';
export type PositionType = 'bottom' | 'top';

export interface I3Bar {
	id: string;
	mode: ModeType;
	position: PositionType;
	status_command: string;
	font: string;
	workspace_buttons: boolean;
	binding_mode_indicator: boolean;
	verbose: boolean;
	colors: Colors;
}

export interface Colors {
	background?: string;
	statusline?: string;
	separator?: string;
	focused_background?: string;
	focused_statusline?: string;
	focused_separator?: string;
	focused_workspace_text?: string;
	focused_workspace_bg?: string;
	focused_workspace_border?: string;
	active_workspace_text?: string;
	active_workspace_bg?: string;
	active_workspace_border?: string;
	inactive_workspace_text?: string;
	inactive_workspace_bg?: string;
	inactive_workspace_border?: string;
	urgent_workspace_text?: string;
	urgent_workspace_bg?: string;
	urgent_workspace_border?: string;
	binding_mode_text?: string;
	binding_mode_bg?: string;
	binding_mode_border?: string;
}
