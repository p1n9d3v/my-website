import type { ReactNode } from 'react';

import path from 'path';

import Dock from '@/os/_components/Dock';
import MenuBar from '@/os/_components/MenuBar';
import WallPaper from '@/os/_components/WallPaper';

import { Directories } from './_constants/config';
import { OSStoreProvider } from './_store/provider';
import { generateBlogFileSystem } from './_utils';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    const basePath = path.join(process.cwd(), 'src', 'app', '(blog)');
    const { nodes: blogNodes, childrenIds } = generateBlogFileSystem(
        basePath,
        'blog',
    );

    Directories['blog'].childrenIds = childrenIds;

    console.log(Directories);

    return (
        <OSStoreProvider
            initialNodes={{
                ...blogNodes,
                ...Directories,
            }}
        >
            <div className="relative h-screen w-screen overflow-hidden">
                <MenuBar />
                <div className="workspace relative top-10 h-[calc(100%-124px)] w-full">
                    {children}
                </div>
                <Dock />
                <WallPaper />
            </div>
        </OSStoreProvider>
    );
}
