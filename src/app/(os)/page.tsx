'use client';

import { Folder } from 'lucide-react';
import { nanoid } from 'nanoid';

import Window from '@/os/_components/Window';

import Program from './_components/Program';
import { useOSStore } from './_store';

const PROGRAMS = [
    {
        name: 'Blog',
        id: nanoid(),
        icon: <Folder size={38} />,
    },
];

export default function Page() {
    const runningApps = useOSStore((state) => state.runningApps);

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
            {Object.values(runningApps).map((process) => (
                <Window
                    key={process.id}
                    appId={process.id}
                    window={process.window}
                    renderHeaderContent={
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                            <p className="text-xl dark:text-green-500">
                                {process.name}
                            </p>
                        </div>
                    }
                >
                    <p className="text-xl dark:text-green-500">Funcking</p>
                </Window>
            ))}
        </>
    );
}
