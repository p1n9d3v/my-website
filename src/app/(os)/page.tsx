'use client';

import { Suspense, useEffect } from 'react';

import Launcher from '@/os/_components/Launcher';

import { ROOT_ID } from './_constants/config';
import { useOSContext } from './_store/provider';

export default function Page() {
    const getDirectory = useOSContext((state) => state.getDirectory);
    const getFile = useOSContext((state) => state.getFile);
    const rootDirectory = getDirectory(ROOT_ID);
    const processes = useOSContext((state) => state.processes);

    const files = rootDirectory.childrenIds.map((childId) => getFile(childId));

    useEffect(() => {
        (async () => {
            const root = await navigator.storage.getDirectory();
            const documents = await root.getDirectoryHandle('Documents', {
                create: true,
            });
            await root.getDirectoryHandle('Pictures', { create: true });
            await root.getDirectoryHandle('Downloads', { create: true });

            const file = await documents.getFileHandle('test.txt', {
                create: true,
            });

            const writable = await file.createWritable();
            await writable.write('Hello World!');
            await writable.close();

            const contents = await file.getFile();
            contents.text().then((text) => console.log(text));
        })();
    }, []);

    return (
        <>
            {files.map((file) => (
                <Launcher key={file.id} file={file} bounds=".workspace" />
            ))}
            {Object.values(processes).map((process) => {
                const App = process.program.Component;
                return (
                    <Suspense key={process.id} fallback={null}>
                        <App process={process} />
                    </Suspense>
                );
            })}
        </>
    );
}
