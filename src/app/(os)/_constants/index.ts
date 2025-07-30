import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

import type { Directory, File, Program } from '@/os/_types/file-system';

//DESC: Window
export const MIN_WIDTH = 600;
export const MIN_HEIGHT = 400;

//DESC: Files
export const ROOT_ID = nanoid();
export const BLOG_ID = nanoid();
export const FINDER_ID = nanoid();
export const MARKDOWN_VIEWER_ID = nanoid();

export const FINDER: Program = {
    id: FINDER_ID,
    name: 'Finder',
    type: 'program',
    parentId: ROOT_ID,
    Icon: dynamic(() => import('lucide-react').then((mod) => mod.Folder)),
    Component: dynamic(() => import('@/os/_programs/Finder')),
};

export const MARKDOWN_VIEWER: Program = {
    id: MARKDOWN_VIEWER_ID,
    name: 'Markdown Viewer',
    type: 'program',
    parentId: ROOT_ID,
    Icon: dynamic(() => import('lucide-react').then((mod) => mod.FileText)),
    Component: dynamic(() => import('@/os/_programs/MarkdownViewer')),
};

export const BLOG_DIRECTORY: Directory = {
    name: 'blog',
    type: 'directory',
    id: BLOG_ID,
    childrenIds: [MARKDOWN_VIEWER_ID],
    parentId: ROOT_ID,
};

export const ROOT_DIRECTORY: Directory = {
    name: '/',
    type: 'directory',
    id: ROOT_ID,
    childrenIds: [BLOG_ID],
    parentId: null,
};

export const INITIAL_NODES: Record<string, File> = {
    [ROOT_ID]: ROOT_DIRECTORY,
    [BLOG_ID]: BLOG_DIRECTORY,
    [FINDER_ID]: FINDER,
    [MARKDOWN_VIEWER_ID]: MARKDOWN_VIEWER,
};
