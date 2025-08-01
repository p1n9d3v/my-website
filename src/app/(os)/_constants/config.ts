import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

import type { Directory, Program } from '../_types/file-system';

/*INFO: Programs ids */
export const FINDER_ID = nanoid();
export const MARKDOWN_VIEWER_ID = nanoid();

/*INFO: File system ids */
export const ROOT_ID = 'root';
export const BLOG_ID = 'blog';

export const INITIAL_PROGRAMS: Record<string, Program> = {
    [FINDER_ID]: {
        id: FINDER_ID,
        name: 'Finder',
        type: 'program',
        parentId: ROOT_ID,
        Icon: dynamic(() => import('lucide-react').then((mod) => mod.Folder)),
        Component: dynamic(() => import('@/os/_programs/Finder')),
    },
    [MARKDOWN_VIEWER_ID]: {
        id: MARKDOWN_VIEWER_ID,
        name: 'Markdown Viewer',
        type: 'program',
        parentId: ROOT_ID,
        Icon: dynamic(() => import('lucide-react').then((mod) => mod.FileText)),
        Component: dynamic(() => import('@/os/_programs/MarkdownViewer')),
    },
};

export const Directories: Record<string, Directory> = {
    [ROOT_ID]: {
        name: '/',
        type: 'directory',
        id: ROOT_ID,
        childrenIds: [BLOG_ID],
        parentId: null,
    },
    [BLOG_ID]: {
        name: 'blog',
        type: 'directory',
        id: BLOG_ID,
        childrenIds: [],
        parentId: ROOT_ID,
    },
};
