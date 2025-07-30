'use client';

import { Suspense } from 'react';

import Launcher from '@/os/_components/Launcher';

import { ROOT_ID } from './_constants';
import { useOSStore } from './_store';

export default function Page() {
    const { getFile, getDirectory } = useOSStore();
    const rootDirectory = getDirectory(ROOT_ID);
    const processes = useOSStore((state) => state.processes);

    const files = rootDirectory.childrenIds.map((childId) => getFile(childId));

    return (
        <>
            {files.map((file) => (
                <Launcher key={file.id} file={file} />
            ))}
            {Object.values(processes).map((process) => {
                const App = process.program.Component;
                return (
                    <Suspense key={process.id} fallback={null}>
                        <App file={process} />
                    </Suspense>
                );
            })}
        </>
    );
}
