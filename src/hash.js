import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export async function calculateHash(currentDir, filePath) {
    try {
        const absolutePath = path.isAbsolute(filePath)
            ? filePath
            : path.join(currentDir, filePath);

        await fs.promises.access(absolutePath, fs.constants.F_OK);

        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(absolutePath);

        stream.on('data', chunk => hash.update(chunk));

        stream.on('end', () => {
            console.log(hash.digest('hex'));
        });

        stream.on('error', () => console.log('Operation failed'));
    } catch {
        console.log('Operation failed');
    }
}