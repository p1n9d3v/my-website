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

export interface Window {
    id: string;
    position: Position;
    size: Size;
    process: Process;
}

export interface Process {
    id: string;
    name: string;
}
