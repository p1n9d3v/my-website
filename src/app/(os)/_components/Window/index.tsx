'use client';

import type { ReactNode } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';

import { useCallback, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import type { Bounds, Window } from '@/os/_types/window';

import useWindowResize from '@/os/_hooks/useWindowResize';
import { useOSStore } from '@/os/_store';
import { cn } from '@/utils/cn';

import WindowHeader from './WindowHeader';

interface WindowProps {
    windowId: string;
    children: ReactNode;
    title?: string;
    renderHeaderContent?: ReactNode;
}

export default function Window({
    windowId,
    title,
    children,
    renderHeaderContent,
}: WindowProps) {
    const _window = useOSStore((state) => state.windows[windowId]);
    const { bounds, isHide, zIndex, isMaximized, processId } = _window;

    const nodeRef = useRef<HTMLDivElement>(null);

    const {
        resizeWindow,
        hideWindow,
        closeWindow,
        maximizeWindow,
        restoreWindow,
        dragWindow,
        terminateProcess,
    } = useOSStore();

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
        workspace: '.workspace',
        onUpdateBounds: useCallback(
            (bounds: Bounds) => resizeWindow(windowId, bounds),
            [windowId, resizeWindow],
        ),
    });

    const handleHideWindow = () => {
        hideWindow(windowId);
    };

    const handleCloseWindow = () => {
        closeWindow(windowId);
        terminateProcess(processId);
    };

    const handleMaximizeWindow = useCallback(() => {
        const workspaceEl = document.querySelector('.workspace');
        if (!workspaceEl) return;

        const workspaceBounds = workspaceEl.getBoundingClientRect();

        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        nodeEl.style.transition = 'all 0.2s linear';

        const updatedBounds = {
            x: 0,
            y: 0,
            width: workspaceBounds.width,
            height: workspaceBounds.height,
        };

        maximizeWindow({
            windowId,
            bounds: updatedBounds,
            prevBounds: {
                ...bounds,
            },
        });
    }, [windowId, bounds, maximizeWindow]);

    const handleRestoreWindow = () => {
        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        restoreWindow(windowId);
        nodeEl.style.transition = 'all 0.2s linear';
    };

    const handleStartDrag = () => {
        document.body.style.cursor = 'grabbing';
    };

    const handleStopDrag = (_: DraggableEvent, data: DraggableData) => {
        document.body.style.cursor = 'default';
        dragWindow(windowId, {
            x: data.x,
            y: data.y,
        });
    };

    //DESC: Browser Window Resize 처리
    useEffect(() => {
        if (isMaximized) {
            const handleMaximizeWindow = () => {
                const workspaceEl = document.querySelector('.workspace');
                if (!workspaceEl) return;

                const workspaceBounds = workspaceEl.getBoundingClientRect();

                const updatedBounds = {
                    x: 0,
                    y: 0,
                    width: workspaceBounds.width,
                    height: workspaceBounds.height,
                };

                maximizeWindow({
                    windowId,
                    bounds: updatedBounds,
                });
            };
            window.addEventListener('resize', handleMaximizeWindow);

            return () => {
                console.log('unmount');
                window.removeEventListener('resize', handleMaximizeWindow);
            };
        }
    }, [windowId, isMaximized, maximizeWindow]);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-title-bar"
            bounds=".workspace"
            disabled={isMaximized}
            position={bounds}
            defaultClassName={cn('left-0 top-0', isHide && 'invisible')}
            onStart={handleStartDrag}
            onStop={handleStopDrag}
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
                    width: bounds.width,
                    height: bounds.height,
                    zIndex,
                }}
                onTransitionEnd={() => {
                    const nodeEl = nodeRef.current;
                    if (!nodeEl) return;

                    nodeEl.style.transition = '';
                }}
            >
                <WindowHeader
                    className="window-title-bar"
                    isMaximized={isMaximized}
                    renderContent={
                        renderHeaderContent ?? (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                                <p className="text-xl text-green-500">
                                    {title ?? '제목 없음'}
                                </p>
                            </div>
                        )
                    }
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
