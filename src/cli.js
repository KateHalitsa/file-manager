import readline from 'readline';
import process from 'process';
import { handleCommand } from './commands.js';

export function startCLI(username, currentDir) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    rl.prompt();

    rl.on('line', async (input) => {
        const result = await handleCommand(input.trim(), currentDir);
        if (result.exit) {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            rl.close();
            process.exit(0);
        }
        currentDir = result.newDir || currentDir;
        console.log(`You are currently in ${currentDir}`);
        rl.prompt();
    });

    rl.on('SIGINT', () => {
        console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    });
}