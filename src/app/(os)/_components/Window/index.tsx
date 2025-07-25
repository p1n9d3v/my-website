'use client';

import type { DraggableData, DraggableEvent } from 'react-draggable';

import { useCallback, useRef } from 'react';
import Draggable from 'react-draggable';

import { cn } from '@/utils/cn';

import type { Position, Size } from '../../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../../_constants';
import useWindowResize from '../../_hooks/useWindowResize';
import { useWindowStore } from '../../_store/window';
import WindowTitleBar from './WindowTitleBar';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    position: Position;
    size: Size;
    isMaximized: boolean;
    zIndex: number;
}

export default function Window({
    id,
    title,
    children,
    position = { x: 100, y: 100 },
    size,
    zIndex = 0,
    isMaximized = false,
}: WindowProps) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<{ x: number; y: number }>({
        x: position.x,
        y: position.y,
    });

    const { closeWindow, activateWindow, updateWindowRect } = useWindowStore();
    const handleUpdate = useCallback(
        (bounds: Partial<Position & Size>) => {
            updateWindowRect(id, bounds);
        },
        [id, updateWindowRect],
    );

    const {
        leftRef,
        rightRef,
        topRef,
        bottomRef,
        leftTopRef,
        rightTopRef,
        leftBottomRef,
        rightBottomRef,
    } = useWindowResize({
        ref: nodeRef,
        onUpdate: handleUpdate,
    });

    const handleDrag = (_: DraggableEvent, data: DraggableData) => {
        positionRef.current.x = data.x;
        positionRef.current.y = data.y;
    };

    const handleCloseWindow = () => closeWindow(id);
    const handleClickWindow = () => activateWindow(id);
    const handleMaximizeWindow = () => {
        const workspaceEl = document.querySelector('.workspace');
        if (!workspaceEl) return;

        const bounds = workspaceEl.getBoundingClientRect();
        const nodeEl = nodeRef.current;

        if (!nodeEl) return;
        nodeEl.style.width = `${bounds.width}px`;
        nodeEl.style.height = `${bounds.height}px`;
        positionRef.current.x = 0;
        positionRef.current.y = 0;
    };

    const handleMinimizeWindow = () => {
        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        nodeEl.style.width = `${MIN_WIDTH}px`;
        nodeEl.style.height = `${MIN_HEIGHT}px`;
        positionRef.current.x = window.innerWidth / 2 - MIN_WIDTH / 2;
        positionRef.current.y = window.innerHeight / 2 - MIN_HEIGHT / 2;
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-title-bar"
            position={positionRef.current}
            onDrag={handleDrag}
        >
            <div
                ref={nodeRef}
                className={cn(
                    'absolute',
                    'bg-black/30 backdrop-blur-sm',
                    'rounded-lg border border-white/20 shadow-2xl',
                    'overflow-hidden',
                )}
                style={{
                    width: size.width,
                    height: size.height,
                    zIndex,
                }}
                onClick={handleClickWindow}
            >
                <WindowTitleBar
                    title={title}
                    className="window-title-bar"
                    isMaximized={isMaximized}
                    onClose={handleCloseWindow}
                    onMaximize={handleMaximizeWindow}
                    onMinimize={handleMinimizeWindow}
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
