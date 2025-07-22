import type { ReactNode } from 'react';

import Dock from './_components/Dock';
import MenuBar from './_components/MenuBar';
import WallPaper from './_components/WallPaper';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    return (
        <div className="h-screen w-screen relative overflow-hidden">
            <MenuBar />
            {children}
            <Dock />
            <WallPaper />
        </div>
    );
}
