import fs from 'fs';
import path from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export async function compress(currentDir, src, dest) {
    try {
        const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
        const destPath = path.isAbsolute(dest) ? dest : path.join(currentDir, dest);

        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath);
        const brotli = createBrotliCompress();

        readStream.pipe(brotli).pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            readStream.on('error', reject);
            writeStream.on('error', reject);
        });
    } catch {
        console.log('Operation failed');
    }
}

export async function decompress(currentDir, src, dest) {
    try {
        const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
        const destPath = path.isAbsolute(dest) ? dest : path.join(currentDir, dest);

        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath);
        const brotli = createBrotliDecompress();

        readStream.pipe(brotli).pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            readStream.on('error', reject);
            writeStream.on('error', reject);
        });
    } catch {
        console.log('Operation failed');
    }
}
