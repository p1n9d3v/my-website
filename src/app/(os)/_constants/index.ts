import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

import type { Directory, Program } from '@/os/_types/file-system';

//DESC: Window
export const MIN_WIDTH = 600;
export const MIN_HEIGHT = 400;

//DESC: Files
export const ROOT_ID = nanoid();
export const BLOG_ID = nanoid();
export const FINDER_ID = nanoid();
export const TEXT_VIEWER_ID = nanoid();

export const FINDER: Program = {
    id: FINDER_ID,
    name: 'finder',
    type: 'program',
    parentId: ROOT_ID,
    Icon: dynamic(() => import('lucide-react').then((mod) => mod.Folder)),
    Component: dynamic(() => import('@/os/_programs/Finder')),
};

export const TEXT_VIEWER: Program = {
    id: TEXT_VIEWER_ID,
    name: 'text-viewer',
    type: 'program',
    parentId: ROOT_ID,
    Icon: dynamic(() => import('lucide-react').then((mod) => mod.FileText)),
    Component: dynamic(() => import('@/os/_programs/TextViewer')),
};

export const BLOG: Directory = {
    name: 'blog',
    type: 'directory',
    id: BLOG_ID,
    childrenIds: [TEXT_VIEWER_ID],
    parentId: ROOT_ID,
};

export const ROOT_DIRECTORY: Directory = {
    name: 'root',
    type: 'directory',
    id: ROOT_ID,
    childrenIds: [BLOG_ID],
    parentId: null,
};
