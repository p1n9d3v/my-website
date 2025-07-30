import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { File } from '../_types/file-system';
import type { WindowSlice } from './slices/window';

import {
    createFileSystemSlice,
    type FileSystemSlice,
} from './slices/file-system';
import { createProcessSlice, type ProcessSlice } from './slices/process';
import { createWindowSlice } from './slices/window';

export type OSStoreState = ProcessSlice & WindowSlice & FileSystemSlice;

export const createOSStore = (initialNodes: Record<string, File>) => {
    return createStore<OSStoreState>()(
        devtools(
            (...a) => ({
                ...createProcessSlice(...a),
                ...createWindowSlice(...a),
                ...createFileSystemSlice(initialNodes)(...a),
            }),
            {
                name: 'OSStore',
            },
        ),
    );
};

export type OSStore = ReturnType<typeof createOSStore>;
