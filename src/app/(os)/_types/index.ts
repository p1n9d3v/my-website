import type { ComponentType } from 'react';

export interface DockApp {
    id: string;
    icon: ComponentType<{ className?: string }>;
    name: string;
    isRunning: boolean;
}
