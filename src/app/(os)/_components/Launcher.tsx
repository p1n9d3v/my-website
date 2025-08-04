'use client';

import { nanoid } from 'nanoid';
import { Suspense, useRef, type ComponentProps } from 'react';

import { type File } from '@/os/_types/file-system';

import { FINDER_ID, MARKDOWN_VIEWER_ID } from '../_constants/config';

interface LauncherProps extends ComponentProps<'button'> {
    bounds: string;
    file: File;
    onDoubleClick?: () => void;
}

const getDefaultProgramId = (file: File) => {
    switch (file.type) {
        case 'program':
            return file.id;
        case 'markdown':
            return MARKDOWN_VIEWER_ID;
        case 'directory':
            return FINDER_ID;
    }
};

export default function Launcher({
    file,
    bounds,
    onDoubleClick,
    ...rest
}: LauncherProps) {
    // const nodeRef = useRef<HTMLButtonElement>(null);
    // const launchProgram = useOSContext((state) => state.launchProgram);
    // const openWindow = useOSContext((state) => state.window.actions.open);
    // const getProgram = useOSContext((state) => state.getProgram);
    //
    // const programId = getDefaultProgramId(file);
    // const program = getProgram(programId);
    //
    // const handleLaunchProcess = () => {
    //     const processId = nanoid();
    //     const windowId = nanoid();
    //     //NOTE: Program일 경우 file === program
    //     launchProgram({
    //         processId,
    //         program,
    //         windowId,
    //         file,
    //     });
    //     openWindow(windowId, processId);
    // };

    return (
        <button
            ref={nodeRef}
            onDoubleClick={onDoubleClick ? onDoubleClick : handleLaunchProcess}
            className="flex flex-col items-center"
            {...rest}
        >
            <Suspense fallback={null}>
                <program.Icon size={36} />
                <p className="text-sm">{file.name}</p>
            </Suspense>
        </button>
    );
}
