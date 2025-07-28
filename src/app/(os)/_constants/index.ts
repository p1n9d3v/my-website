import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

import type { App } from '@/os/_types';

//DESC: Window
export const MIN_WIDTH = 300;
export const MIN_HEIGHT = 300;

//DESC: Apps
export const BLOG_ID = nanoid();
export const BLOG = {
    name: 'Blog',
    id: BLOG_ID,
    Icon: dynamic(() => import('lucide-react').then((mod) => mod.Folder)),
    Component: dynamic(() => import('@/os/_apps/Blog')),
};

export const APPS: Record<string, App> = {
    [BLOG_ID]: BLOG,
};
