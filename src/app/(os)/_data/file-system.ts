export type FileType = 'markdown' | 'directory';

export interface BaseFile {
    id: string;
    type: FileType;
    name: string;
    path: string;
    icon: string;
    program: string;
}

export interface Process<T = File> {
    id: string;
    windowId: string;
    file: T;
}

export interface Markdown extends BaseFile {
    type: 'markdown';
}

export interface Directory extends BaseFile {
    type: 'directory';
}

export type File = Markdown | Directory;

export const isDirectory = (file: File): file is Directory =>
    file.type === 'directory';

export const isMarkdown = (file: File): file is Markdown =>
    file.type === 'markdown';
