import type { ReactNode } from 'react';

import path from 'path';

import Dock from '@/os/_components/Dock';
import MenuBar from '@/os/_components/MenuBar';
import WallPaper from '@/os/_components/WallPaper';

import { INITIAL_NODES } from './_constants';
import { OSStoreProvider } from './_store/provider';
import { generateFileSystem } from './_utils';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    const basePath = path.join(process.cwd(), 'src', 'app', '(blog)');
    const nodes = generateFileSystem(basePath);
    console.log(nodes);
    return (
        <OSStoreProvider initialNodes={{}}>
            <div className="relative h-screen w-screen overflow-hidden">
                <MenuBar />
                <div className="workspace relative top-10 h-[calc(100%-130px)] w-full">
                    {children}
                </div>
                <Dock />
                <WallPaper />
            </div>
        </OSStoreProvider>
    );
}
