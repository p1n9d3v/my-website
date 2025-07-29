import type { ComponentType } from 'react';

export interface DockApp {
    id: string;
    icon: ComponentType<{ className?: string }>;
    name: string;
    isRunning: boolean;
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Window {
    bounds: Bounds;
    prevBounds?: Bounds;
    zIndex: number;
    isHide: boolean;
    isMaximized: boolean;
}

export interface App {
    id: string;
    type: 'app';
    name: string;
    Icon: ComponentType<any>;
    Component: ComponentType<any>;
    parentId: string | null;
}

export interface FileContext {
    id: string;
    name: string;
    window: Window;
}

export interface TextFile {
    id: string;
    type: 'text';
    name: string;
    parentId: string | null;
    content?: string;
    size?: number;
}

export interface Directory {
    id: string;
    type: 'directory';
    name: string;
    parentId: string | null;
    childrenIds: string[];
}

export type File = TextFile | Directory | App;
