'use client';

import type { ReactNode } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

import type { Bounds } from '@/os/_types/window';

import { cn } from '@/utils/cn';

import { useOSStore } from '../../_store';
import WindowHeader from './WindowHeader';

interface WindowProps {
    windowId: string;
    children: ReactNode;
    title?: string;
    renderHeaderContent?: ReactNode;
}

gsap.registerPlugin(useGSAP);
export default function Window({
    windowId,
    title,
    children,
    renderHeaderContent,
}: WindowProps) {
    const _window = useOSStore((state) => state.window.data[windowId]);
    const { bounds, isHide, zIndex, processId } = _window;

    const [isMaximized, setIsMaximized] = useState(false);

    const nodeRef = useRef<Rnd>(null);
    const prevBoundsRef = useRef<Bounds>(bounds);
    const initialRenderRef = useRef(false);

    const { hide, close, active, update } = useOSStore(
        (state) => state.window.actions,
    );
    const terminateProcess = useOSStore(
        (state) => state.process.actions.terminate,
    );

    const handleHideWindow = () => {
        hide(windowId);
    };

    useGSAP(
        () => {
            const nodeEl = nodeRef.current?.getSelfElement();
            const desktopEl = document.querySelector('.desktop');
            if (!desktopEl || !nodeEl) return;

            if (!initialRenderRef.current) {
                gsap.fromTo(
                    nodeEl,
                    {
                        autoAlpha: 0,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.2,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            initialRenderRef.current = true;
                        },
                    },
                );

                return;
            }

            const desktopBounds = desktopEl.getBoundingClientRect();
            if (isHide) {
                gsap.fromTo(
                    nodeEl,
                    {
                        ...bounds,
                    },
                    {
                        y: desktopBounds.height,
                        x: desktopBounds.width / 2,
                        width: 0,
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: 'power3.inOut',
                    },
                );
            } else {
                gsap.fromTo(
                    nodeEl,
                    {
                        y: desktopBounds.height,
                        x: desktopBounds.width / 2,
                        width: 0,
                        autoAlpha: 0,
                    },
                    {
                        ...bounds,
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    },
                );
            }
        },
        {
            dependencies: [isHide],
        },
    );

    const handleCloseWindow = () => {
        const nodeEl = nodeRef.current?.getSelfElement();
        if (!nodeEl) return;

        gsap.fromTo(
            nodeEl,
            {
                autoAlpha: 1,
            },
            {
                autoAlpha: 0,
                duration: 0.3,
                ease: 'power3.inOut',
                onComplete: () => {
                    close(windowId);
                    terminateProcess(processId);
                },
            },
        );
    };

    const handleMaximizeWindow = () => {
        const desktopEl = document.querySelector('.desktop');
        const nodeEl = nodeRef.current?.getSelfElement();
        if (!desktopEl || !nodeEl) return;

        const desktopBounds = desktopEl.getBoundingClientRect();

        prevBoundsRef.current = { ...bounds };
        gsap.fromTo(
            nodeEl,
            {
                ...bounds,
            },
            {
                x: 0,
                y: 0,
                width: desktopBounds.width,
                height: desktopBounds.height,
                onComplete: () => {
                    update(windowId, {
                        x: 0,
                        y: 0,
                        width: desktopBounds.width,
                        height: desktopBounds.height,
                    });
                    setIsMaximized(true);
                },
            },
        );
    };

    const handleRestoreWindow = () => {
        const nodeEl = nodeRef.current?.getSelfElement();
        if (!nodeEl) return;

        gsap.fromTo(
            nodeEl,
            {
                ...bounds,
            },
            {
                ...prevBoundsRef.current,
                onComplete: () => {
                    update(windowId, {
                        ...prevBoundsRef.current,
                    });
                    setIsMaximized(false);
                },
            },
        );
    };

    const handleActivateWindow = () => {
        active(windowId);
    };

    return (
        <Rnd
            size={{ width: bounds.width, height: bounds.height }}
            position={{ x: bounds.x, y: bounds.y }}
            onDragStop={(_, data) => {
                update(windowId, {
                    x: data.x,
                    y: data.y,
                });
            }}
            onResizeStop={(_, __, ref, ___, position) => {
                update(windowId, {
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    x: position.x,
                    y: position.y,
                });
            }}
            dragHandleClassName="window-title-bar"
            onMouseDown={handleActivateWindow}
            ref={nodeRef}
            className={cn(
                'bg-black/30 backdrop-blur-sm',
                'rounded-lg border border-white/20 shadow-2xl',
            )}
            style={{
                zIndex,
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
            <div className="relative h-[calc(100%-32px)] w-full">
                {children}
            </div>
        </Rnd>
    );
}
