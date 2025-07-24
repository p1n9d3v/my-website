'use client';

import { nanoid } from 'nanoid';

import Window from './_components/Window';
import { useWindowStore } from './_store/window';

export default function Page() {
    const windows = useWindowStore((state) => state.windows);
    const registerWindow = useWindowStore((state) => state.registerWindow);

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
                <Window
                    key={window.id}
                    title={window.process.name}
                    size={window.size}
                    position={window.position}
                    id={window.id}
                >
                    <p className="text-xl dark:text-green-500">Funcking</p>
                </Window>
            ))}
        </>
    );
}
