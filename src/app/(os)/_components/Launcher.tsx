import type { ComponentType } from 'react';

import { useRef, type ComponentProps } from 'react';
import Draggable from 'react-draggable';

import { useOSStore } from '@/os/_store';

interface LauncherProps extends ComponentProps<'button'> {
    Icon: ComponentType<any>;
    name: string;
    appId: string;
}

export default function Launcher({
    Icon,
    name,
    appId,
    ...rest
}: LauncherProps) {
    const nodeRef = useRef<HTMLButtonElement>(null);
    const launchApp = useOSStore((state) => state.launchApp);

    const handleLaunchProcess = () => {
        launchApp(appId);
    };

    return (
        <Draggable nodeRef={nodeRef} bounds=".workspace">
            <button ref={nodeRef} onDoubleClick={handleLaunchProcess} {...rest}>
                <Icon />
                <p className="text-sm">{name}</p>
            </button>
        </Draggable>
    );
}
