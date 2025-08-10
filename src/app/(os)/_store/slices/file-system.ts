import type { StateCreator } from 'zustand';

import type { File } from '@/os/_data/file-system';

import type { OSStoreState } from '..';

export interface FileSystemStoreStates {
    data: Record<string, File>;
}

export interface FileSystemStoreActions {
    initialize: () => void;
}

export type FileSystemSlice = FileSystemStoreStates & {
    actions: FileSystemStoreActions;
};

export const createFileSystemSlice: StateCreator<
    OSStoreState,
    [['zustand/immer', never]],
    [],
    FileSystemSlice
> = (set, get) => ({
    data: {},
    actions: {
        initialize: () => {},
    },
});
