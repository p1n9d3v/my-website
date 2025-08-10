'use client';

import { useState } from 'react';

import Launcher from '@/os/_components/Launcher';
import Window from '@/os/_components/Window';

import type { Directory, Process } from '../../_data/file-system';

interface FinderProps {
    process: Process<Directory>;
}

export default function Finder({ process }: FinderProps) {
    const { file, windowId } = process;
    const [history, setHistory] = useState<Set<string>>(
        new Set([process.file.id]),
    );

    const [files, setFiles] = useState<File[]>();
    // getFiles(process.file.childrenIds),

    const handleDoubleClick = (directory: Directory) => {
        setHistory(new Set([...history, directory.id]));
    };

    const handleBack = () => {
        const beforeId = [...history][history.size - 2];
    };

    const handleForward = () => {
        const nextId = [...history][history.size - 1];
    };

    return (
        <Window
            windowId={windowId}
            renderHeaderContent={
                <div className="ml-4 flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button onClick={handleBack}>&lt;</button>
                        <button onClick={handleForward}>&gt;</button>
                    </div>
                    <p className="text-xl text-green-500">{file.name}</p>
                </div>
            }
        >
            <div>1111</div>
        </Window>
    );
}
