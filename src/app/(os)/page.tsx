'use client';

import { Folder } from 'lucide-react';
import { nanoid } from 'nanoid';

import Program from './_components/Program';
import Window from './_components/Window';
import { useOSStore } from './_store';

const PROGRAMS = [
    {
        name: 'Blog',
        id: nanoid(),
        icon: <Folder size={38} />,
    },
];

export default function Page() {
    const windows = useOSStore((state) => state.windows);

    return (
        <>
            {PROGRAMS.map((program) => (
                <Program
                    key={program.id}
                    name={program.name}
                    id={program.id}
                    icon={program.icon}
                />
            ))}
            {Object.values(windows).map((window) => (
                <Window key={window.id} window={window}>
                    <p className="text-xl dark:text-green-500">Funcking</p>
                </Window>
            ))}
        </>
    );
}
