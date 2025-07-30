import { immer } from 'zustand/middleware/immer';

import type { Program } from '@/os/_types/file-system';

import {
    BLOG,
    BLOG_ID,
    FINDER,
    FINDER_ID,
    ROOT_DIRECTORY,
    ROOT_ID,
    TEXT_VIEWER_ID,
} from '@/os/_constants';
import {
    type Directory,
    type File,
    isDirectory,
    isProgram,
} from '@/os/_types/file-system';

export interface FileSystemStoreStates {
    nodes: Record<string, File>;
}

export interface FileSystemStoreActions {
    getDirectory: (directoryId: string) => Directory;
    getProgram: (programId: string) => Program;
    getFile: (fileId: string) => File;
}

export type FileSystemSlice = FileSystemStoreStates & FileSystemStoreActions;

export const useFileSystemSlice = immer<FileSystemSlice>((set, get) => ({
    nodes: {
        [ROOT_ID]: ROOT_DIRECTORY,
        [BLOG_ID]: BLOG,
        [FINDER_ID]: FINDER,
        [TEXT_VIEWER_ID]: TEXT_VIEWER,
    },
    getFile: (fileId) => {
        const file = get().nodes[fileId];

        return file;
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
