import type { ReactNode } from 'react';

import Dock from './_components/Dock';
import MenuBar from './_components/MenuBar';
import WallPaper from './_components/WallPaper';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <MenuBar />
            <div className="workspace relative top-10 h-[calc(100%-130px)] w-full">
                {children}
            </div>
            <Dock />
            <WallPaper />
        </div>
    );
}
