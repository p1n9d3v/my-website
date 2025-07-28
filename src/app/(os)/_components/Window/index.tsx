'use client';

import type { ReactNode } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';

import { useRef } from 'react';
import Draggable from 'react-draggable';

import type { AppContext, Bounds } from '@/os/_types';

import useWindowResize from '@/os/_hooks/useWindowResize';
import { cn } from '@/utils/cn';

import { useOSStore } from '../../_store';
import WindowHeader from './WindowHeader';

interface WindowProps {
    app: AppContext;
    children: ReactNode;
    renderHeaderContent?: ReactNode;
}

export default function Window({
    app,
    children,
    renderHeaderContent,
}: WindowProps) {
    const { id: appId, window: _window } = app;
    const { bounds, prevBounds, isHide, zIndex, isMaximized } = _window;

    const nodeRef = useRef<HTMLDivElement>(null);

    const { updateWindowBounds, hideApp, terminateApp } = useOSStore();

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
        onUpdateBounds: (bounds) =>
            handleUpdateWindowBounds({
                bounds,
                isMaximized: false,
            }),
    });

    const handleHideWindow = () => {
        hideApp(appId);
    };

    const handleTerminateWindow = () => {
        terminateApp(appId);
    };

    const handleUpdateWindowBounds = ({
        bounds,
        prevBounds,
        isMaximized,
    }: {
        bounds: Bounds;
        prevBounds?: Bounds;
        isMaximized?: boolean;
    }) => {
        updateWindowBounds({
            appId,
            bounds,
            prevBounds,
            isMaximized,
        });
    };

    const handleMaximizeWindow = () => {
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

        handleUpdateWindowBounds?.({
            bounds: updatedBounds,
            prevBounds: {
                ...bounds,
            },
            isMaximized: true,
        });
    };

    const handleRestoreWindow = () => {
        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        nodeEl.style.transition = 'all 0.2s linear';

        if (prevBounds) {
            handleUpdateWindowBounds?.({
                bounds: {
                    ...prevBounds,
                },
                isMaximized: false,
            });
        }
    };

    const handleStartDrag = () => {
        document.body.style.cursor = 'grabbing';
    };

    const handleStopDrag = (_: DraggableEvent, data: DraggableData) => {
        document.body.style.cursor = 'default';
        const updatedBounds = {
            ...bounds,
            x: data.x,
            y: data.y,
        };
        handleUpdateWindowBounds?.({
            bounds: updatedBounds,
            isMaximized: false,
        });
    };

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
                    renderContent={renderHeaderContent}
                    onClose={handleTerminateWindow}
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
