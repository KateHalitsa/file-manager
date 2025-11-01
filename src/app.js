import os from 'os';
import process from 'process';
import { startCLI } from './cli.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = os.homedir();
console.log(`You are currently in ${currentDir}`);

startCLI(username, currentDir);/**/