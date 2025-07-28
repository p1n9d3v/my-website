'use client';

import type { ReactNode } from 'react';

import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

import type { Position, Size, Window } from '@/os/_types';

import useWindowResize from '@/os/_hooks/useWindowResize';
import { cn } from '@/utils/cn';

import WindowHeader from './WindowHeader';

interface WindowProps {
    window: Window;
    children: ReactNode;
    renderHeaderContent?: ReactNode;
    onClose?: () => void;
    onClick?: () => void;
    onHide?: () => void;
    onUpdateRect?: (rect: { position?: Position; size?: Size }) => void;
}

export default function Window({
    window: _window,
    children,
    renderHeaderContent,
    onClose,
    onClick,
    onHide,
    onUpdateRect,
}: WindowProps) {
    const { position, size, isHide, zIndex } = _window;
    const [syncPosition, setSyncPosition] = useState<Position>(position);
    const [syncSize, setSyncSize] = useState<Size>(size);

    const [isMaximized, setIsMaximized] = useState(false);
    const [animation, setAnimation] = useState(false);

    const nodeRef = useRef<HTMLDivElement>(null);

    const prevSizeRef = useRef<Size>(size);
    const prevPositionRef = useRef<Position>(position);
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
        onUpdateSize: (size) => setSyncSize(size),
        onUpdatePosition: (position) => setSyncPosition(position),
        workspace: '.workspace',
    });

    const handleCloseWindow = () => onClose && onClose();
    const handleClickWindow = () => onClick && onClick();
    const handleHideWindow = () => onHide && onHide();

    const handleMaximizeWindow = () => {
        const workspaceEl = document.querySelector('.workspace');
        if (!workspaceEl) return;

        setAnimation(true);
        const workspaceBounds = workspaceEl.getBoundingClientRect();

        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        nodeEl.style.transition = 'all 0.2s ease-in-out';

        prevSizeRef.current = {
            width: syncSize.width,
            height: syncSize.height,
        };
        prevPositionRef.current = {
            x: syncPosition.x,
            y: syncPosition.y,
        };

        setSyncSize({
            width: workspaceBounds.width,
            height: workspaceBounds.height,
        });
        setSyncPosition({
            x: 0,
            y: 0,
        });

        setIsMaximized(true);
    };

    const handleRestoreWindow = () => {
        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        nodeEl.style.transition = 'all 0.2s linear';

        setAnimation(true);
        setSyncSize({
            width: prevSizeRef.current.width,
            height: prevSizeRef.current.height,
        });
        setSyncPosition({
            x: prevPositionRef.current.x,
            y: prevPositionRef.current.y,
        });

        setIsMaximized(false);
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-title-bar"
            bounds=".workspace"
            disabled={isMaximized}
            position={syncPosition}
            defaultClassName={cn('left-0 top-0', isHide && 'invisible')}
            onStart={() => {
                document.body.style.cursor = 'grabbing';
            }}
            onStop={(_, data) => {
                document.body.style.cursor = 'default';
                setSyncPosition(data);
            }}
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
                    width: syncSize.width,
                    height: syncSize.height,
                    zIndex,
                }}
                onTransitionEnd={() => {
                    const nodeEl = nodeRef.current;
                    if (!nodeEl) return;

                    nodeEl.style.transition = '';
                }}
                onClick={handleClickWindow}
            >
                <WindowHeader
                    className="window-title-bar"
                    isMaximized={isMaximized}
                    renderContent={renderHeaderContent}
                    onClose={handleCloseWindow}
                    onMaximize={handleMaximizeWindow}
                    onRestore={handleRestoreWindow}
                    onHide={handleHideWindow}
                />

                {/*DESC: 컨텐츠 영역 */}
                <div className="h-[calc(100%-2rem)]">{children}</div>

                {/*DESC: Resizer */}
                <div
                    ref={leftRef}
                    className="absolute top-0 left-0 h-full w-1 cursor-ew-resize"
                />
                <div
                    ref={rightRef}
                    className="absolute top-0 right-0 h-full w-1 cursor-ew-resize"
                />
                <div
                    ref={topRef}
                    className="absolute top-0 left-0 h-1 w-full cursor-ns-resize"
                />
                <div
                    ref={bottomRef}
                    className="absolute bottom-0 left-0 h-1 w-full cursor-s-resize"
                />
                <div
                    ref={leftTopRef}
                    className="absolute top-0 left-0 h-2 w-2 cursor-nwse-resize rounded-full"
                />
                <div
                    ref={rightTopRef}
                    className="absolute top-0 right-0 h-2 w-2 cursor-nesw-resize rounded-full"
                />
                <div
                    ref={leftBottomRef}
                    className="absolute bottom-0 left-0 h-2 w-2 cursor-nesw-resize rounded-full"
                />
                <div
                    ref={rightBottomRef}
                    className="absolute right-0 bottom-0 h-2 w-2 cursor-nwse-resize rounded-full"
                />
            </div>
        </Draggable>
    );
}
