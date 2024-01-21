// Native
import * as path from 'path';

// Packages
import * as fs from 'fs-extra';
import { argv } from 'yargs';

// Ours
import loadConfig from './loader';
import isPackageMode from '../util/is-package-mode';
import { ConfigPath } from '../util/file-paths';

const cfgDirectoryPath = (argv['cfgPath'] as string) ?? path.join(process.env.NODECG_ROOT, ConfigPath);

// Make 'cfg' folder if it doesn't exist
if (!fs.existsSync(cfgDirectoryPath) && !isPackageMode) {
	fs.mkdirpSync(cfgDirectoryPath);
}

const { config, filteredConfig } = loadConfig(cfgDirectoryPath);
export { config, filteredConfig };
