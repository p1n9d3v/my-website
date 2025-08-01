'use client';

import { Suspense } from 'react';

import Launcher from '@/os/_components/Launcher';

import { ROOT_ID } from './_constants/config';
import { useOSContext } from './_store/provider';

export default function Page() {
    const getDirectory = useOSContext((state) => state.getDirectory);
    const getFile = useOSContext((state) => state.getFile);
    const rootDirectory = getDirectory(ROOT_ID);
    const processes = useOSContext((state) => state.processes);

    const files = rootDirectory.childrenIds.map((childId) => getFile(childId));
    console.log(111);

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
