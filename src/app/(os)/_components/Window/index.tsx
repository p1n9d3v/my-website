'use client';

import { useRef } from 'react';
import Draggable from 'react-draggable';

import { cn } from '@/utils/cn';

import WindowTitleBar from './WindowTitleBar';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isActive?: boolean;
    position?: { x: number; y: number };
    size?: { width: number; height: number };
}

export default function Window({
    title,
    children,
    isActive = true,
    position = { x: 100, y: 100 },
    size = { width: 600, height: 400 },
}: WindowProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-title-bar"
            defaultPosition={position}
        >
            <div
                ref={nodeRef}
                className={cn(
                    'absolute',
                    'bg-black/30 backdrop-blur-sm',
                    'rounded-lg shadow-2xl border border-white/20',
                    isActive ? 'z-50' : 'z-40',
                )}
                style={{
                    left: position.x,
                    top: position.y,
                    width: size.width,
                    height: size.height,
                }}
            >
                <WindowTitleBar title={title} className="window-title-bar" />

                {/* 컨텐츠 영역 */}
                <div className="p-4 h-[calc(100%-2rem)] overflow-auto">
                    {children}
                </div>
            </div>
        </Draggable>
    );
}
