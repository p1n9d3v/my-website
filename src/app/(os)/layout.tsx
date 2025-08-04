'use client';

import type { ReactNode } from 'react';

import Dock from '@/os/_components/Dock';
import MenuBar from '@/os/_components/MenuBar';
import WallPaper from '@/os/_components/WallPaper';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <MenuBar />
            <div className="desktop relative top-10 h-[calc(100%-124px)] w-full">
                {children}
            </div>
            <Dock />
            <WallPaper />
        </div>
    );
}
