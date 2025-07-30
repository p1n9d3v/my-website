'use client';

import { nanoid } from 'nanoid';
import { Suspense, useRef, type ComponentProps } from 'react';
import Draggable from 'react-draggable';

import { type File } from '@/os/_types/file-system';

import { FINDER_ID, MARKDOWN_VIEWER_ID } from '../_constants';
import { useOSContext } from '../_store/provider';

interface LauncherProps extends ComponentProps<'button'> {
    file: File;
}

const getProgramId = (file: File) => {
    switch (file.type) {
        case 'program':
            return file.id;
        case 'markdown':
            return MARKDOWN_VIEWER_ID;
        case 'directory':
            return FINDER_ID;
    }
};

export default function Launcher({ file, ...rest }: LauncherProps) {
    const nodeRef = useRef<HTMLButtonElement>(null);
    const launchProgram = useOSContext((state) => state.launchProgram);
    const openWindow = useOSContext((state) => state.openWindow);
    const getProgram = useOSContext((state) => state.getProgram);

    const programId = getProgramId(file);
    const program = getProgram(programId);

    const handleLaunchProcess = () => {
        const processId = nanoid();
        const windowId = nanoid();
        //NOTE: Program일 경우 file === program
        launchProgram({
            processId,
            program,
            windowId,
            file,
        });
        openWindow(windowId, processId);
    };

    return (
        <Draggable nodeRef={nodeRef} bounds=".workspace">
            <button ref={nodeRef} onDoubleClick={handleLaunchProcess} {...rest}>
                <Suspense fallback={null}>
                    <program.Icon size={36} />
                    <p className="text-sm">{file.name}</p>
                </Suspense>
                {/* <Icon size={36} /> */}
            </button>
        </Draggable>
    );
}
