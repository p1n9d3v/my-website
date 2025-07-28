import { immer } from 'zustand/middleware/immer';

import type { Entry } from '../../_types';

export interface FileSystemStoreStates {
    entries: Record<string, Entry>;
}

export interface FileSystemStoreActions {}

export type FileSystemSlice = FileSystemStoreStates & FileSystemStoreActions;

export const useFileSlice = immer<FileSystemSlice>((set) => ({
    entries: {},
}));
