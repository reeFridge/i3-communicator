import {execSync} from 'child_process';

export default function(): string {
	return execSync('i3 --get-socketpath')
		.toString('utf-8')
		.trim();
}
