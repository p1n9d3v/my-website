import type { ComponentProps, ReactNode } from 'react';

import { useOSStore } from '../_store';

interface ProgramProps extends ComponentProps<'button'> {
    icon: ReactNode;
    name: string;
    id: string;
}

export default function Program({ icon, name, id, ...rest }: ProgramProps) {
    const registerWindow = useOSStore((state) => state.launchProgram);

    const handleLaunchProcess = () => {
        registerWindow({
            id,
            name,
        });
    };

    return (
        <button {...rest} onDoubleClick={handleLaunchProcess}>
            {icon}
            <p className="text-sm">{name}</p>
        </button>
    );
}
