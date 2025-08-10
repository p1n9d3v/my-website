'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';

import { useOSStore } from '@/os/_store';

import Launcher from './_components/Launcher';
import Process from './_components/Process';
import indexedDB from './_data/indexed-db';
import Finder from './_programs/Finder';
import MarkdownViewer from './_programs/MarkdownViewer';

export default function Page() {
    const processes = useOSStore((state) => state.process.data);

    const files = useLiveQuery(() => indexedDB.fs.toArray());

    useEffect(() => {
        const contents = files?.map(async (file) => {
            const content = await fetch(file.path).then((res) => res.text());
            console.log(content);
        });
    }, [files]);

    return (
        <>
            {files?.map((file) => (
                <Launcher key={file.id} file={file} bounds=".workspace" />
            ))}

            {Object.values(processes).map((process) => (
                <Process key={process.id} process={process} />
            ))}
        </>
    );
}
