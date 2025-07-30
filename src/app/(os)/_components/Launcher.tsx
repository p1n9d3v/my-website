import { nanoid } from 'nanoid';
import { Suspense, useRef, type ComponentProps } from 'react';
import Draggable from 'react-draggable';

import { useOSStore } from '@/os/_store';
import { type File } from '@/os/_types/file-system';

import { FINDER_ID, TEXT_VIEWER_ID } from '../_constants';

interface LauncherProps extends ComponentProps<'button'> {
    file: File;
}

const getProgramId = (file: File) => {
    switch (file.type) {
        case 'program':
            return file.id;
        case 'text':
            return TEXT_VIEWER_ID;
        case 'directory':
            return FINDER_ID;
    }
};

export default function Launcher({ file, ...rest }: LauncherProps) {
    const nodeRef = useRef<HTMLButtonElement>(null);
    const launchProgram = useOSStore((state) => state.launchProgram);
    const openWindow = useOSStore((state) => state.openWindow);
    const getProgram = useOSStore((state) => state.getProgram);

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
