#!/usr/bin/env node

import { Command, Option } from 'commander';

// This must happen before we import any of our other application code.
if (!process.env.NODECG_ROOT) {
	process.env.NODECG_ROOT = process.cwd();
}

process.env.NODECG_MODE = 'package';

import { StartNodeCG } from './bootstrap';
import { LogLevel } from '../shared/logger-interface';

const program = new Command();

program.name('nodecg').description('Dynamic broadcast graphics rendered in a browser').version('2.2.0');

const portOption = new Option('-p, --port <number>', 'Port NodeCG will use').env('PORT');
const configPathOption = new Option('-c, --config <path>', 'Path to NodeCG config file');
const logLevelOption = new Option('-l, --log-level <level>', 'Logging level').choices(Object.values(LogLevel));

program
	.command('start')
	.description('Starts NodeCG')
	.addOption(portOption)
	.addOption(configPathOption)
	.addOption(logLevelOption)
	.action(StartNodeCG);

program.parse();
