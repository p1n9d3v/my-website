'use client';

import type { ReactNode } from 'react';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import type { OSStoreState } from '.';
import type { File } from '../_types/file-system';

import { createOSStore, type OSStore } from '.';

const OSStoreContext = createContext<OSStore | null>(null);

interface StoreProviderProps {
    children: ReactNode;
    initialNodes: Record<string, File>;
}

export const OSStoreProvider = ({
    children,
    initialNodes,
}: StoreProviderProps) => {
    const storeRef = useRef<OSStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = createOSStore(initialNodes);
    }

    return (
        <OSStoreContext.Provider value={storeRef.current}>
            {children}
        </OSStoreContext.Provider>
    );
};

export const useOSContext = <T,>(selector: (store: OSStoreState) => T): T => {
    const store = useContext(OSStoreContext);
    if (!store) {
        throw new Error('useOSStore must be used within a StoreProvider.');
    }

    return useStore(store, selector);
};
