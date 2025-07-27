import type { ComponentProps, ReactNode } from 'react';

import { useOSStore } from '../_store';

interface ProgramProps extends ComponentProps<'button'> {
    icon: ReactNode;
    name: string;
    id: string;
}

export default function Program({ icon, name, id, ...rest }: ProgramProps) {
    const registerWindow = useOSStore((state) => state.registerWindow);

    const handleRegisterProcess = () => {
        registerWindow({
            id,
            name,
        });
    };

    return (
        <button {...rest} onClick={handleRegisterProcess}>
            {icon}
            <p className="text-sm">{name}</p>
        </button>
    );
}
