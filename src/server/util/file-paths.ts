// File paths for NodeCG whether running in package mode or embedded mode

import isPackageMode from './is-package-mode';

export const AssetsPath = isPackageMode ? '.nodecg/assets' : 'assets';
export const ConfigPath = isPackageMode ? 'config' : 'cfg';
export const MultiBundlePath = 'bundles';
export const LogsPath = isPackageMode ? '.nodecg/nodecg.log' : 'logs/nodecg.log';
export const DbPath = isPackageMode ? '.nodecg/db/nodecg.sqlite3' : 'db/nodecg.sqlite3';
