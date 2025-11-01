import { up, cd, ls } from './navigation.js';
import { cat, add, rn, cp, mv, rm, mkdir } from './fileOperations.js';
import { getEOL, getCpus, getHomedir, getUsername, getArchitecture } from './osInfo.js';
import { calculateHash } from './hash.js';
import { compress, decompress } from './compression.js';

export async function handleCommand(input, currentDir) {
    const [command, ...args] = input.split(' ');

    try {
        switch (command) {
            case 'up':
                return { newDir: await up(currentDir) };

            case 'cd':
                return { newDir: await cd(currentDir, args[0]) };

            case 'ls':
                await ls(currentDir);
                break;

            case 'cat':
                await cat(args[0]);
                break;

            case 'add':
                await add(currentDir, args[0]);
                break;

           case 'mkdir':
                await mkdir(currentDir, args[0]);
                break;

           case 'rn':
                await rn(currentDir,args[0], args[1]);
                break;

            case 'cp':
                await cp(currentDir, args[0], args[1]);
                break;

            case 'mv':
                await mv(currentDir, args[0], args[1]);
                break;

            case 'rm':
                await rm(currentDir, args[0]);
                break;

             case 'os':
                switch (args[0]) {
                    case '--EOL':
                        getEOL();
                        break;
                    case '--cpus':
                        getCpus();
                        break;
                    case '--homedir':
                        getHomedir();
                        break;
                    case '--username':
                        getUsername();
                        break;
                    case '--architecture':
                        getArchitecture();
                        break;
                    default:
                        console.log('Invalid input');
                }
                break;
         case 'hash':
               await calculateHash(currentDir, args[0]);
               break;

           case 'compress':
               await compress(currentDir,args[0], args[1]);
               break;

           case 'decompress':
               await decompress(currentDir,args[0], args[1]);
               break;

           case '.exit':
               return { exit: true };

            default:
                console.log('Invalid input');
        }
    } catch (err) {
        console.log('Operation failed');
    }

    return { newDir: currentDir };
}