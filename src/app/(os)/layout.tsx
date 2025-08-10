import type { ReactNode } from 'react';

import path from 'path';

import Dock from '@/os/_components/Dock';
import MenuBar from '@/os/_components/MenuBar';
import WallPaper from '@/os/_components/WallPaper';

import type { File } from './_data/file-system';

import FileSystemInitializer from './_components/FileSystemInitializer';
import { scanDirSync } from './_utils/file-system';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    const nodes: Record<string, File> = {};

    scanDirSync('public/blog', ({ fileName, filePath, stats }) => {
        const relativePath = path.relative('public', filePath);

        const id = relativePath;

        if (stats.isDirectory()) {
            nodes[id] = {
                id,
                type: 'directory',
                name: fileName,
                path: relativePath,
                icon: 'assets/icons/folder.svg',
                program: 'Finder',
            };
        } else if (stats.isFile()) {
            nodes[id] = {
                id,
                type: 'markdown',
                name: fileName,
                path: relativePath,
                icon: 'assets/icons/file.svg',
                program: 'MarkdownViewer',
            };
        }
    });

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <FileSystemInitializer nodes={nodes} />
            <MenuBar />
            <div className="workspace relative top-10 h-[calc(100%-124px)] w-full">
                {children}
            </div>
            <Dock />
            <WallPaper />
        </div>
    );
}
