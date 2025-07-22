'use client';
import {
    Folder,
    User,
    Briefcase,
    FileText,
    Terminal,
    Mail,
    Trash2,
    Settings,
    Music,
} from 'lucide-react';

import { cn } from '@/utils/cn';

interface DockApp {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    isRunning: boolean;
}

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

    const handleAppClick = (app: DockApp) => {
        console.log(`${app.name} 앱 실행/포커스`);
    };

    const handleAppRightClick = (e: React.MouseEvent, app: DockApp) => {
        e.preventDefault();
        console.log(`${app.name} 컨텍스트 메뉴`);
    };

    const DockIcon = ({ app }: { app: DockApp }) => {
        const IconComponent = app.icon;

        return (
            <div className="relative flex flex-col items-center">
                <button
                    onClick={() => handleAppClick(app)}
                    onContextMenu={(e) => handleAppRightClick(e, app)}
                    className={cn(
                        'w-14 h-14',
                        'flex items-center justify-center',
                        'rounded-xl transition-all duration-300 ease-out',
                        'hover:bg-white/20 cursor-pointer',
                        'hover:transform hover:-translate-y-2 hover:scale-110',
                        'active:scale-95',
                    )}
                    title={app.name}
                    aria-label={`${app.name} ${app.isRunning ? '(실행 중)' : ''}`}
                >
                    <IconComponent
                        className={cn(
                            'w-8 h-8',
                            'text-white transition-all duration-300 drop-shadow-sm',
                        )}
                    />
                </button>

                {app.isRunning && (
                    <div
                        className={cn(
                            'absolute -bottom-1',
                            'w-1 h-1',
                            'rounded-full bg-white/80',
                        )}
                    />
                )}
            </div>
        );
    };

    return (
        <div
            className={cn(
                'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40',
                'bg-white/10 backdrop-blur-md border border-white/20',
                'rounded-2xl shadow-lg shadow-black/20',
            )}
        >
            <div className="flex items-end gap-1 p-2">
                {dockApps.map((app) => (
                    <DockIcon key={app.id} app={app} />
                ))}
            </div>
        </div>
    );
}
