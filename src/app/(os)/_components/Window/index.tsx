'use client';

import { useRef } from 'react';
import Draggable from 'react-draggable';

import { cn } from '@/utils/cn';

import type { Position, Size } from '../../_types';

import useWindowResize from '../../_hooks/useWindowResize';
import { useWindowStore } from '../../_store/window';
import WindowTitleBar from './WindowTitleBar';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isActive?: boolean;
    position?: Position;
    size?: Size;
}

export default function Window({
    id,
    title,
    children,
    isActive = true,
    position = { x: 100, y: 100 },
    size = { width: 600, height: 400 },
}: WindowProps) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const {
        leftRef,
        rightRef,
        topRef,
        bottomRef,
        leftTopRef,
        rightTopRef,
        leftBottomRef,
        rightBottomRef,
    } = useWindowResize({ ref: nodeRef });

    const { closeWindow } = useWindowStore();

    const handleCloseWindow = () => closeWindow(id);
    //NOTE: Resize

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
                    'rounded-lg border border-white/20 shadow-2xl',
                    'overflow-hidden',
                    isActive ? 'z-50' : 'z-40',
                )}
                style={{
                    width: size.width,
                    height: size.height,
                }}
            >
                <WindowTitleBar
                    title={title}
                    className="window-title-bar"
                    onClose={handleCloseWindow}
                />

                {/* 컨텐츠 영역 */}
                <div className="h-[calc(100%-2rem)] overflow-auto p-4">
                    {children}
                </div>
                <div
                    ref={leftRef}
                    className="absolute top-0 left-0 h-full w-1 cursor-w-resize"
                />
                <div
                    ref={rightRef}
                    className="absolute top-0 right-0 h-full w-1 cursor-e-resize"
                />
                <div
                    ref={topRef}
                    className="absolute top-0 left-0 h-1 w-full cursor-n-resize"
                />
                <div
                    ref={bottomRef}
                    className="absolute bottom-0 left-0 h-1 w-full cursor-s-resize"
                />
                <div
                    ref={leftTopRef}
                    className="absolute top-0 left-0 h-2 w-2 cursor-nw-resize rounded-full"
                />
                <div
                    ref={rightTopRef}
                    className="absolute top-0 right-0 h-2 w-2 cursor-ne-resize rounded-full"
                />
                <div
                    ref={leftBottomRef}
                    className="absolute bottom-0 left-0 h-2 w-2 cursor-sw-resize rounded-full"
                />
                <div
                    ref={rightBottomRef}
                    className="absolute right-0 bottom-0 h-2 w-2 cursor-se-resize rounded-full"
                />
            </div>
        </Draggable>
    );
}
