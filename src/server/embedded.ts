import rootPath from '../shared/utils/rootPath';
import { StartNodeCG } from './bootstrap';

const cwd = process.cwd();
if (cwd !== rootPath.path) {
	console.warn('[nodecg] process.cwd is %s, expected %s', cwd, rootPath.path);
	process.chdir(rootPath.path);
	console.info('[nodecg] Changed process.cwd to %s', rootPath.path);
}

if (!process.env.NODECG_ROOT) {
	// This must happen before we import any of our other application code.
	process.env.NODECG_ROOT = process.cwd();
}

StartNodeCG();
