'use client';

import { useLayoutEffect, useState } from 'react';

import indexedDB from '../_data/indexed-db';

interface FileSystemInitializerProps {
    nodes: Record<string, any>;
}

export default function FileSystemInitializer({
    nodes,
}: FileSystemInitializerProps) {
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        (async () => {
            try {
                await indexedDB.fs.bulkAdd(Object.values(nodes));
            } catch (e) {
                throw new Error('File system is not initialized');
            } finally {
                setLoading(false);
            }
        })();
    }, [nodes]);

    if (loading) {
        return (
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-white" />
            </div>
        );
    }

    return null;
}
