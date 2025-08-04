'use client';

import { Suspense, useEffect } from 'react';

import Launcher from '@/os/_components/Launcher';
import { useOSStore } from '@/os/_store';

export default function Page() {
    const processes = useOSStore((state) => state.process.data);

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
            {/* {files.map((file) => ( */}
            {/*     <Launcher key={file.id} file={file} bounds=".workspace" /> */}
            {/* ))} */}
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
