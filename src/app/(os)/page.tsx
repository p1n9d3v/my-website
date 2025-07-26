'use client';

import { nanoid } from 'nanoid';

import Window from './_components/Window';
import { useOSStore } from './_store';

export default function Page() {
    const { windows, registerWindow } = useOSStore();

    const handleRegisterProcess = () => {
        registerWindow({
            name: '프로세스 이름',
            id: nanoid(),
        });
    };

    return (
        <>
            <button onClick={handleRegisterProcess}>Test1</button>
            {Object.values(windows).map((window) => (
                <Window key={window.id} window={window}>
                    <p className="text-xl dark:text-green-500">Funcking</p>
                </Window>
            ))}
        </>
    );
}
