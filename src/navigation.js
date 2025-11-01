import fs from "fs";
import path from 'path';
export async function ls(currentDir) {
    try {
        const items = await fs.promises.readdir(currentDir, { withFileTypes: true });
        const dirs = items.filter(i => i.isDirectory()).map(i => i.name);
        const files = items.filter(i => i.isFile()).map(i => i.name);

        console.table([
            ...dirs.map(name => ({ Name: name, Type: 'directory' })),
            ...files.map(name => ({ Name: name, Type: 'file' }))
        ]);
    } catch {
        console.log('Operation failed');
    }
}

export async function up(currentDir) {
    const parentDir = path.dirname(currentDir);
    if (parentDir !== currentDir) {
        return parentDir;
    } else {
        console.log('You are at the root directory');
        return currentDir;
    }
}

export async function cd(currentDir, targetPath) {
    try {
        const newPath = path.isAbsolute(targetPath)
            ? targetPath
            : path.join(currentDir, targetPath);
        const stat = await fs.promises.stat(newPath);
        if (stat.isDirectory()) {
            return newPath;
        } else {
            console.log('Operation failed');
            return currentDir;
        }
    } catch {
        console.log('Operation failed');
        return currentDir;
    }
}