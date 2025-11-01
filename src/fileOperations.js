import fs from 'fs';
import path from 'path';


export async function cat(filePath) {
    const stream = fs.createReadStream(filePath, 'utf-8');
    stream.on('data', chunk => process.stdout.write(chunk));
    stream.on('error', () => console.log('Operation failed'));
    stream.on('end', () => console.log('\n'));
}


export async function add(currentDir, fileName) {
    const filePath = path.join(currentDir, fileName);
    try {
        await fs.promises.writeFile(filePath, '');
    } catch {
        console.log('Operation failed');
    }
}


export async function rn(filePath, newName) {
    try {
        const dir = path.dirname(filePath);
        const newPath = path.join(dir, newName);
        await fs.promises.rename(filePath, newPath);
    } catch {
        console.log('Operation failed');
    }
}


export async function cp(src, destDir) {
    const fileName = path.basename(src);
    const destPath = path.join(destDir, fileName);
    const read = fs.createReadStream(src);
    const write = fs.createWriteStream(destPath);
    read.pipe(write);
    read.on('error', () => console.log('Operation failed'));
    write.on('error', () => console.log('Operation failed'));
}

export async function mv(src, destDir) {
    await cp(src, destDir);
    try {
        await fs.promises.unlink(src);
    } catch {
        console.log('Operation failed');
    }
}

export async function rm(filePath) {
    try {
        await fs.promises.unlink(filePath);
    } catch {
        console.log('Operation failed');
    }
}
export async function mkdir(currentDir, folderName) {
    const dirPath = path.join(currentDir, folderName);
    try {
        await fs.promises.mkdir(dirPath);
    } catch {
        console.log('Operation failed');
    }
}
