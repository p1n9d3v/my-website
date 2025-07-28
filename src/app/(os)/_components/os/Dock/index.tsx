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

import { cn } from '@/utils/cn';

import type { DockApp } from '../../../_types';

import DockIcon from './DockIcon';

export default function Dock() {
    const dockApps: DockApp[] = [
        { id: 'finder', icon: Folder, name: 'Finder', isRunning: false },
        { id: 'about', icon: User, name: 'About Me', isRunning: false },
        {
            id: 'portfolio',
            icon: Briefcase,
            name: 'Portfolio',
            isRunning: true,
        },
        { id: 'blog', icon: FileText, name: 'Blog', isRunning: false },
        { id: 'terminal', icon: Terminal, name: 'Terminal', isRunning: true },
        { id: 'contact', icon: Mail, name: 'Contact', isRunning: false },
        { id: 'music', icon: Music, name: 'Music', isRunning: false },
        { id: 'settings', icon: Settings, name: 'Settings', isRunning: false },
        { id: 'trash', icon: Trash2, name: 'Trash', isRunning: false },
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
                    <DockIcon key={app.id} app={app} />
                ))}
            </div>
        </div>
    );
}
