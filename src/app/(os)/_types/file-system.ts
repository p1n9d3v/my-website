import type { ComponentType } from 'react';

export interface BaseFile {
    id: string;
    type: 'markdown' | 'directory' | 'program';
    name: string;
    parentId: string | null;
}

export interface Program extends BaseFile {
    type: 'program';
    Icon: ComponentType<any>;
    Component: ComponentType<any>;
}

export interface Process<T = File> {
    id: string;
    program: Program;
    windowId: string;
    file: T;
}

export interface Markdown extends BaseFile {
    type: 'markdown';
    content: string;
}

export interface Directory extends BaseFile {
    type: 'directory';
    childrenIds: string[];
}

export type File = Markdown | Directory | Program;

export const isDirectory = (file: File): file is Directory =>
    file.type === 'directory';

export const isProgram = (file: File): file is Program =>
    file.type === 'program';

export const isMarkdown = (file: File): file is Markdown =>
    file.type === 'markdown';
