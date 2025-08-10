import fs from 'node:fs';
import path from 'path';

export const scanDirSync = (
    directory: string,
    callback: ({
        fileName,
        filePath,
        stats,
    }: {
        fileName: string;
        filePath: string;
        stats: fs.Stats;
    }) => void,
) => {
    const normalizedDirectory = directory.startsWith('/')
        ? directory.substring(1)
        : directory;

    const absolutePath = path.join(process.cwd(), normalizedDirectory);

    const files = fs.readdirSync(absolutePath);
    for (const fileName of files) {
        const filePath = path.join(absolutePath, fileName);

        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            scanDirSync(path.join(normalizedDirectory, fileName), callback);
        }

        callback({ fileName, filePath, stats });
    }
};
