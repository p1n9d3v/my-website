import type { ComponentType } from 'react';

export interface BaseFile {
    id: string;
    type: 'text' | 'directory' | 'program';
    name: string;
    parentId: string | null;
}

export interface Program extends BaseFile {
    type: 'program';
    Icon: ComponentType<any>;
    Component: ComponentType<any>;
}

export interface Process {
    id: string;
    program: Program;
    windowId: string;
    file?: File;
}

export interface TextFile extends BaseFile {
    type: 'text';
    content: string;
}

export interface Directory extends BaseFile {
    type: 'directory';
    childrenIds: string[];
}

export type File = TextFile | Directory | Program;

export const isDirectory = (file: File): file is Directory =>
    file.type === 'directory';

export const isProgram = (file: File): file is Program =>
    file.type === 'program';

export const isTextFile = (file: File): file is TextFile =>
    file.type === 'text';
