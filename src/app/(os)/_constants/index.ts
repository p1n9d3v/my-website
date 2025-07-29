import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

import type { App, Directory } from '@/os/_types';

//DESC: Window
export const MIN_WIDTH = 300;
export const MIN_HEIGHT = 300;

//DESC: Apps
export const BLOG_ID = nanoid();
export const DESKTOP_ID = nanoid();

export const BLOG: App = {
    name: 'Blog',
    type: 'app',
    id: BLOG_ID,
    Icon: dynamic(() => import('lucide-react').then((mod) => mod.Folder)),
    Component: dynamic(() => import('@/os/_apps/Blog')),
    parentId: DESKTOP_ID,
};

export const APPS: Record<string, App> = {
    [BLOG_ID]: BLOG,
};

export const DESKTOP_ETNRIES: Directory = {
    name: 'Desktop',
    type: 'directory',
    id: DESKTOP_ID,
    childrenIds: [BLOG_ID],
    parentId: null,
};
