'use client';

import { useState } from 'react';

import type { Directory, File, Process } from '@/os/_types/file-system';

import Launcher from '@/os/_components/Launcher';
import Window from '@/os/_components/Window';
import { useOSContext } from '@/os/_store/provider';

interface FinderProps {
    process: Process<Directory>;
}

export default function Finder({ process }: FinderProps) {
    const { program, windowId } = process;
    const [history, setHistory] = useState<Set<string>>(
        new Set([process.file.id]),
    );
    const getFiles = useOSContext((state) => state.getFiles);
    const getDirectory = useOSContext((state) => state.getDirectory);

    const [files, setFiles] = useState<File[]>(
        getFiles(process.file.childrenIds),
    );

    const handleDoubleClick = (directory: Directory) => {
        setFiles(getFiles(directory.childrenIds));
        setHistory(new Set([...history, directory.id]));
    };

    const handleBack = () => {
        const beforeId = [...history][history.size - 2];
        const directory = getDirectory(beforeId);
        setFiles(getFiles(directory.childrenIds));
    };

    const handleForward = () => {
        const nextId = [...history][history.size - 1];
        const directory = getDirectory(nextId);
        setFiles(getFiles(directory.childrenIds));
    };

    return (
        <Window
            contentClassName="finder-window"
            windowId={windowId}
            renderHeaderContent={
                <div className="ml-4 flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button onClick={handleBack}>&lt;</button>
                        <button onClick={handleForward}>&gt;</button>
                    </div>
                    <p className="text-xl text-green-500">{program.name}</p>
                </div>
            }
        >
            {files.map((file) => (
                <Launcher
                    key={file.id}
                    file={file}
                    bounds=".finder-window"
                    onDoubleClick={
                        file.type === 'directory'
                            ? () => handleDoubleClick(file)
                            : undefined
                    }
                />
            ))}
        </Window>
    );
}
