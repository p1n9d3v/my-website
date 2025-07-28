import { useRef, type ComponentProps, type ReactNode } from 'react';
import Draggable from 'react-draggable';

import { useOSStore } from '@/os/_store';

interface ProgramProps extends ComponentProps<'button'> {
    icon: ReactNode;
    name: string;
    id: string;
}

export default function Program({ icon, name, id, ...rest }: ProgramProps) {
    const nodeRef = useRef<HTMLButtonElement>(null);
    const launchApp = useOSStore((state) => state.launchApp);

    const handleLaunchProcess = () => {
        launchApp({
            id,
            name,
        });
    };

    return (
        <Draggable nodeRef={nodeRef} bounds=".workspace">
            <button ref={nodeRef} onDoubleClick={handleLaunchProcess} {...rest}>
                {icon}
                <p className="text-sm">{name}</p>
            </button>
        </Draggable>
    );
}
