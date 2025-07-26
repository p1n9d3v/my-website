'use client';

import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { cn } from '@/utils/cn';

import type { Position, Size } from '../../_types';

import useWindowResize from '../../_hooks/useWindowResize';
import { useOSStore } from '../../_store';
import WindowHeader from './WindowHeader';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    position: Position;
    size: Size;
    zIndex: number;
    isHide: boolean;
}

export default function Window({
    id,
    title,
    children,
    position,
    size,
    isHide,
    zIndex = 0,
}: WindowProps) {
    const [isMaximized, setIsMaximized] = useState(false);

    const nodeRef = useRef<HTMLDivElement>(null);
    const prevTransform = useRef<string>('');
    const prevSize = useRef<Size>(size);

    const { closeWindow, activateWindow, hideWindow } = useOSStore();

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
    });

    const handleCloseWindow = () => closeWindow(id);
    const handleClickWindow = () => activateWindow(id);
    const handleHideWindow = () => hideWindow(id);

    const handleMaximizeWindow = () => {
        const workspaceEl = document.querySelector('.workspace');
        if (!workspaceEl) return;

        const workspaceBounds = workspaceEl.getBoundingClientRect();
        const nodeEl = nodeRef.current;

        if (!nodeEl) return;

        prevSize.current = {
            width: nodeEl.clientWidth,
            height: nodeEl.clientHeight,
        };
        nodeEl.style.width = `${workspaceBounds.width}px`;
        nodeEl.style.height = `${workspaceBounds.height}px`;

        const nodeTransform = window.getComputedStyle(nodeEl).transform;
        prevTransform.current = nodeTransform;

        //NOTE: Draggable 컴포넌트가 transform 속성을 사용하기 때문에 변경된 resize를 통해 변경된 left,top에 대한 보정 처리
        const transformMatrix = new DOMMatrix(nodeTransform);
        const translateX = transformMatrix.m41;
        const translateY = transformMatrix.m42;

        const nodeBounds = nodeEl.getBoundingClientRect();

        const newTranslateX = translateX - nodeBounds.x;
        const newTranslateY = translateY - nodeBounds.y + 40;

        nodeEl.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;

        setIsMaximized(true);
    };

    const handleRestoreWindow = () => {
        const nodeEl = nodeRef.current;
        if (!nodeEl) return;

        nodeEl.style.width = `${prevSize.current.width}px`;
        nodeEl.style.height = `${prevSize.current.height}px`;

        nodeEl.style.transform = prevTransform.current;

        setIsMaximized(false);
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-title-bar"
            bounds=".workspace"
            defaultPosition={position}
            defaultClassName={cn('left-0 top-0', isHide && 'invisible')}
            onDrag={() => {
                document.body.style.cursor = 'grabbing';
            }}
            onStop={() => {
                document.body.style.cursor = 'default';
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
                    width: size.width,
                    height: size.height,
                    zIndex,
                }}
                onClick={handleClickWindow}
            >
                <WindowHeader
                    title={title}
                    className="window-title-bar"
                    isMaximized={isMaximized}
                    onClose={handleCloseWindow}
                    onMaximize={handleMaximizeWindow}
                    onRestore={handleRestoreWindow}
                    onHide={handleHideWindow}
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
