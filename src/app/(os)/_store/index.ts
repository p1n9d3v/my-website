import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { WindowSlice } from './slices/window';

import { useFileSystemSlice, type FileSystemSlice } from './slices/file-system';
import { useAppSlice, type ProcessSlice } from './slices/process';
import { useWindowSlice } from './slices/window';

type CombinedState = ProcessSlice & WindowSlice & FileSystemSlice;

export const useOSStore = create<CombinedState>()(
    devtools(
        (...a) => ({
            ...useAppSlice(...a),
            ...useWindowSlice(...a),
            ...useFileSystemSlice(...a),
        }),
        {
            name: 'OSStore',
        },
    ),
);
