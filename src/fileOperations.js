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



export async function rn(currentDir, fileName, newName) {
    if (!fileName || !newName) return console.log('Invalid input');

    const oldPath = path.join(currentDir, fileName);
    const newPath = path.join(currentDir, newName);

    try {
        await fs.promises.rename(oldPath, newPath);
    } catch {
        console.log('Operation failed');
    }
}


export async function cp(currentDir, src, destDir) {
    try {
        const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
        const destDirPath = path.isAbsolute(destDir) ? destDir : path.join(currentDir, destDir);

        const fileName = path.basename(src);
        const destPath = path.join(destDirPath, fileName);

        await fs.promises.access(srcPath, fs.constants.F_OK);

        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath);
        readStream.pipe(writeStream);
        await new Promise((resolve, reject) => {
            readStream.on('error', reject);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    } catch {
        console.log('Operation failed');
    }
}

export async function mv(currentDir, src, destDir) {
    try {
        const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);

        await fs.promises.access(srcPath, fs.constants.F_OK);
        await cp(currentDir, src, destDir);
        await fs.promises.unlink(srcPath);
    } catch {
        console.log('Operation failed');
    }
}

export async function rm(currentDir, filePath) {
    try {
        const srcPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
        await fs.promises.access(srcPath, fs.constants.F_OK);
        await fs.promises.unlink(srcPath);
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
