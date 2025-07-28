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
    name: string;
    Icon: ComponentType<any>;
    Component: ComponentType<any>;
}

export interface AppContext {
    id: string;
    name: string;
    window: Window;
}

export interface File {
    id: string;
    name: string;
    directoryId: string | null;
}

export interface Directory {
    id: string;
    name: string;
    entries: Record<string, Entry>;
    directoryId: string | null;
}

export type Entry = File | Directory;
