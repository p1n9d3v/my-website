'use client';

import {
    Briefcase,
    FileText,
    Folder,
    Mail,
    Music,
    Settings,
    Terminal,
    Trash2,
    User,
} from 'lucide-react';

import type { Program } from '@/os/_types/file-system';

import { cn } from '@/utils/cn';

import DockIcon from './DockIcon';

export default function Dock() {
    const dockApps: (Program & any)[] = [
        { id: 'finder', Icon: Folder, name: 'Finder', isRunning: false },
        { id: 'about', Icon: User, name: 'About Me', isRunning: false },
        {
            id: 'portfolio',
            Icon: Briefcase,
            name: 'Portfolio',
            isRunning: true,
        },
        { id: 'blog', Icon: FileText, name: 'Blog', isRunning: false },
        { id: 'terminal', Icon: Terminal, name: 'Terminal', isRunning: true },
        { id: 'contact', Icon: Mail, name: 'Contact', isRunning: false },
        { id: 'music', Icon: Music, name: 'Music', isRunning: false },
        { id: 'settings', Icon: Settings, name: 'Settings', isRunning: false },
        { id: 'trash', Icon: Trash2, name: 'Trash', isRunning: false },
    ];

    return (
        <div
            className={cn(
                'fixed bottom-2.5 left-1/2 z-40 -translate-x-1/2 transform',
                'border border-white/20 bg-white/10 backdrop-blur-md',
                'rounded-2xl shadow-lg shadow-black/20',
            )}
        >
            <div className="flex items-end gap-2 px-4 py-3">
                {dockApps.map((app) => (
                    <DockIcon
                        key={app.id}
                        app={app}
                        isRunning={app.isRunning}
                    />
                ))}
            </div>
        </div>
    );
}
