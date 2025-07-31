import type { ReactNode } from 'react';

import path from 'path';

import Dock from '@/os/_components/Dock';
import MenuBar from '@/os/_components/MenuBar';
import WallPaper from '@/os/_components/WallPaper';

import type { Directory } from './_types/file-system';

import { BLOG_ID, ROOT_ID } from './_constants';
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

    const rootDirectory: Directory = {
        id: ROOT_ID,
        type: 'directory',
        name: '/',
        parentId: null,
        childrenIds: [BLOG_ID],
    };
    const blogDirectory: Directory = {
        id: BLOG_ID,
        type: 'directory',
        name: 'blog',
        parentId: ROOT_ID,
        childrenIds: childrenIds,
    };

    return (
        <OSStoreProvider
            initialNodes={{
                [ROOT_ID]: rootDirectory,
                [BLOG_ID]: blogDirectory,
                ...blogNodes,
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
