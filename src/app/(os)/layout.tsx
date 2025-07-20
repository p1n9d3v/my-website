import type { ReactNode } from 'react';

import MenuBar from './_components/MenuBar';
import WallPaper from './_components/WallPaper';

interface OSLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: OSLayoutProps) {
    return (
        <>
            <MenuBar />
            {children}
            <WallPaper />
        </>
    );
}
