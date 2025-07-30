import { immer } from 'zustand/middleware/immer';

import type { Program } from '@/os/_types/file-system';

import {
    type Directory,
    type File,
    isDirectory,
    isProgram,
} from '@/os/_types/file-system';

import { INITIAL_NODES } from '../../_constants';

export interface FileSystemStoreStates {
    nodes: Record<string, File>;
}

export interface FileSystemStoreActions {
    getDirectory: (directoryId: string) => Directory;
    getProgram: (programId: string) => Program;
    getFile: (fileId: string) => File;
    getFiles: (fileIds: string[]) => File[];
}

export type FileSystemSlice = FileSystemStoreStates & FileSystemStoreActions;

export const createFileSystemSlice = (initialNodes: Record<string, File>) =>
    immer<FileSystemSlice>((set, get) => ({
        nodes: {
            ...INITIAL_NODES,
        },
        getFile: (fileId) => {
            const file = get().nodes[fileId];

            return file;
        },
        getFiles: (fileIds) => {
            return fileIds.map((fileId) => get().getFile(fileId));
        },
        getProgram: (programId) => {
            const program = get().nodes[programId];

            if (!isProgram(program)) {
                throw new Error('The program is not found');
            }

            return program;
        },
        getDirectory: (directoryId) => {
            const directory = get().nodes[directoryId];

            if (!isDirectory(directory)) {
                throw new Error('The directory is not found');
            }

            return directory;
        },
    }));
