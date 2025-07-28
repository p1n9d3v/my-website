import { useCallback, useEffect, useRef, type RefObject } from 'react';

import type { Bounds } from '../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../_constants';

interface UseWindowResizeProps {
    ref: RefObject<HTMLDivElement | null>;
    workspace: string;
    onUpdateBounds: (bounds: Bounds) => void;
}

export default function useWindowResize({
    ref,
    workspace,
    onUpdateBounds,
}: UseWindowResizeProps) {
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const leftTopRef = useRef<HTMLDivElement>(null);
    const rightTopRef = useRef<HTMLDivElement>(null);
    const leftBottomRef = useRef<HTMLDivElement>(null);
    const rightBottomRef = useRef<HTMLDivElement>(null);

    const initialMouseX = useRef(0);
    const initialMouseY = useRef(0);
    const initialElemWidth = useRef(0);
    const initialElemHeight = useRef(0);
    const initialElemLeft = useRef(0);
    const initialElemTop = useRef(0);

    const getSize = useCallback((el: HTMLElement) => {
        const styles = window.getComputedStyle(el);
        return {
            width: parseInt(styles.width, 10),
            height: parseInt(styles.height, 10),
        };
    }, []);

    const getTranslate = useCallback((el: HTMLElement) => {
        const transformMatrix = new DOMMatrix(
            window.getComputedStyle(el).transform,
        );
        const translateX = transformMatrix.m41;
        const translateY = transformMatrix.m42;

        return { translateX, translateY };
    }, []);

    useEffect(() => {
        const resizableEl = ref.current;
        const workspaceEl = document.querySelector(workspace);
        if (!resizableEl || !workspaceEl) return;

        const handleCleanUp = () => {
            document.removeEventListener(
                'mousemove',
                handleMouseMoveRightResize,
            );
            document.removeEventListener('mousemove', handleMouseMoveTopResize);
            document.removeEventListener(
                'mousemove',
                handleMouseMoveBottomResize,
            );
            document.removeEventListener(
                'mousemove',
                handleMouseMoveLeftResize,
            );
            document.removeEventListener(
                'mousemove',
                handleMouseMoveLeftTopResize,
            );
            document.removeEventListener(
                'mousemove',
                handleMouseMoveRightTopResize,
            );
            document.removeEventListener(
                'mousemove',
                handleMouseMoveRightBottomResize,
            );
            document.removeEventListener(
                'mousemove',
                handleMouseMoveLeftBottomResize,
            );
            document.removeEventListener('mouseup', handleCleanUp);
        };

        const updateBounds = () => {
            const { translateX, translateY } = getTranslate(resizableEl);
            const { width, height } = getSize(resizableEl);

            onUpdateBounds?.({ x: translateX, y: translateY, width, height });
        };

        // NOTE: RIGHT
        const handleMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX.current;
            const newWidth = initialElemWidth.current + dx;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
        };

        const handleMouseUpRightResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveRightResize,
            );
            updateBounds();
            document.removeEventListener('mouseup', handleMouseUpRightResize);
        };

        const handleMouseDownRightResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;

            const { width } = getSize(resizableEl);
            initialElemWidth.current = width;

            document.body.style.cursor = 'ew-resize';
            document.addEventListener('mousemove', handleMouseMoveRightResize);
            document.addEventListener('mouseup', handleMouseUpRightResize);
        };

        // NOTE: TOP
        const handleMouseMoveTopResize = (event: MouseEvent) => {
            const dy = initialMouseY.current - event.clientY;
            const newHeight = initialElemHeight.current + dy;
            const newTop = initialElemTop.current - dy;

            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;

                const { translateX } = getTranslate(resizableEl);
                resizableEl.style.transform = `translate(${translateX}px, ${newTop}px)`;
            }
        };

        const handleMouseUpTopResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener('mousemove', handleMouseMoveTopResize);
            updateBounds();
            document.removeEventListener('mouseup', handleMouseUpTopResize);
        };

        const handleMouseDownTopResize = (event: MouseEvent) => {
            initialMouseY.current = event.clientY;

            const { height } = getSize(resizableEl);
            initialElemHeight.current = height;

            const { translateY } = getTranslate(resizableEl);
            initialElemTop.current = translateY;

            document.body.style.cursor = 'ns-resize';
            document.addEventListener('mousemove', handleMouseMoveTopResize);
            document.addEventListener('mouseup', handleMouseUpTopResize);
        };

        // NOTE: BOTTOM
        const handleMouseMoveBottomResize = (event: MouseEvent) => {
            const dy = event.clientY - initialMouseY.current;
            const newHeight = initialElemHeight.current + dy;

            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };

        const handleMouseUpBottomResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveBottomResize,
            );
            updateBounds();
            document.removeEventListener('mouseup', handleMouseUpBottomResize);
        };

        const handleMouseDownBottomResize = (event: MouseEvent) => {
            initialMouseY.current = event.clientY;

            const { height } = getSize(resizableEl);
            initialElemHeight.current = height;

            document.body.style.cursor = 'ns-resize';
            document.addEventListener('mousemove', handleMouseMoveBottomResize);
            document.addEventListener('mouseup', handleMouseUpBottomResize);
        };

        // NOTE: LEFT
        const handleMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = initialMouseX.current - event.clientX;
            const newWidth = initialElemWidth.current + dx;
            const newLeft = initialElemLeft.current - dx;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;

                const { translateY } = getTranslate(resizableEl);
                resizableEl.style.transform = `translate(${newLeft}px, ${translateY}px)`;
            }
        };

        const handleMouseUpLeftResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveLeftResize,
            );
            updateBounds();
            document.removeEventListener('mouseup', handleMouseUpLeftResize);
        };

        const handleMouseDownLeftResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;

            const { width } = getSize(resizableEl);
            initialElemWidth.current = width;

            const { translateX } = getTranslate(resizableEl);
            initialElemLeft.current = translateX;

            document.body.style.cursor = 'ew-resize';
            document.addEventListener('mousemove', handleMouseMoveLeftResize);
            document.addEventListener('mouseup', handleMouseUpLeftResize);
        };

        // NOTE: LEFT TOP
        const handleMouseMoveLeftTopResize = (event: MouseEvent) => {
            const dx = initialMouseX.current - event.clientX;
            const newWidth = initialElemWidth.current + dx;
            const newLeft = initialElemLeft.current - dx;

            const dy = initialMouseY.current - event.clientY;
            const newHeight = initialElemHeight.current + dy;
            const newTop = initialElemTop.current - dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;

                const { translateY } = getTranslate(resizableEl);
                resizableEl.style.transform = `translate(${newLeft}px, ${translateY}px)`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;

                const { translateX } = getTranslate(resizableEl);
                resizableEl.style.transform = `translate(${translateX}px, ${newTop}px)`;
            }
        };

        const handleMouseUpLeftTopResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveLeftTopResize,
            );
            updateBounds();
            document.removeEventListener('mouseup', handleMouseUpLeftTopResize);
        };

        const handleMouseDownLeftTopResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;

            const { width, height } = getSize(resizableEl);
            initialElemWidth.current = width;
            initialElemHeight.current = height;

            const { translateX, translateY } = getTranslate(resizableEl);
            initialElemLeft.current = translateX;
            initialElemTop.current = translateY;

            document.body.style.cursor = 'nwse-resize';
            document.addEventListener(
                'mousemove',
                handleMouseMoveLeftTopResize,
            );
            document.addEventListener('mouseup', handleMouseUpLeftTopResize);
        };

        // NOTE: RIGHT TOP
        const handleMouseMoveRightTopResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX.current;
            const newWidth = initialElemWidth.current + dx;

            const dy = initialMouseY.current - event.clientY;
            const newHeight = initialElemHeight.current + dy;
            const newTop = initialElemTop.current - dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;

                const { translateX } = getTranslate(resizableEl);
                resizableEl.style.transform = `translate(${translateX}px, ${newTop}px)`;
            }
        };

        const handleMouseUpRightTopResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveRightTopResize,
            );
            updateBounds();
            document.removeEventListener(
                'mouseup',
                handleMouseUpRightTopResize,
            );
        };

        const handleMouseDownRightTopResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;

            const { width, height } = getSize(resizableEl);
            initialElemWidth.current = width;
            initialElemHeight.current = height;

            const { translateX, translateY } = getTranslate(resizableEl);
            initialElemLeft.current = translateX;
            initialElemTop.current = translateY;

            document.body.style.cursor = 'nesw-resize';
            document.addEventListener(
                'mousemove',
                handleMouseMoveRightTopResize,
            );
            document.addEventListener('mouseup', handleMouseUpRightTopResize);
        };

        // NOTE: RIGHT BOTTOM
        const handleMouseMoveRightBottomResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX.current;
            const newWidth = initialElemWidth.current + dx;

            const dy = event.clientY - initialMouseY.current;
            const newHeight = initialElemHeight.current + dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };

        const handleMouseUpRightBottomResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveRightBottomResize,
            );
            updateBounds();
            document.removeEventListener(
                'mouseup',
                handleMouseUpRightBottomResize,
            );
        };

        const handleMouseDownRightBottomResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;

            const { width, height } = getSize(resizableEl);
            initialElemWidth.current = width;
            initialElemHeight.current = height;

            document.body.style.cursor = 'nwse-resize';
            document.addEventListener(
                'mousemove',
                handleMouseMoveRightBottomResize,
            );
            document.addEventListener(
                'mouseup',
                handleMouseUpRightBottomResize,
            );
        };

        // NOTE: LEFT BOTTOM
        const handleMouseMoveLeftBottomResize = (event: MouseEvent) => {
            const dx = initialMouseX.current - event.clientX;
            const newWidth = initialElemWidth.current + dx;
            const newLeft = initialElemLeft.current - dx;

            const dy = event.clientY - initialMouseY.current;
            const newHeight = initialElemHeight.current + dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;

                const { translateY } = getTranslate(resizableEl);
                resizableEl.style.transform = `translate(${newLeft}px, ${translateY}px)`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };

        const handleMouseUpLeftBottomResize = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener(
                'mousemove',
                handleMouseMoveLeftBottomResize,
            );
            updateBounds();
            document.removeEventListener(
                'mouseup',
                handleMouseUpLeftBottomResize,
            );
        };

        const handleMouseDownLeftBottomResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;

            const { width, height } = getSize(resizableEl);
            initialElemWidth.current = width;
            initialElemHeight.current = height;

            const { translateX, translateY } = getTranslate(resizableEl);
            initialElemLeft.current = translateX;
            initialElemTop.current = translateY;

            document.body.style.cursor = 'nesw-resize';
            document.addEventListener(
                'mousemove',
                handleMouseMoveLeftBottomResize,
            );
            document.addEventListener('mouseup', handleMouseUpLeftBottomResize);
        };

        const resizerRight = rightRef.current;
        resizerRight?.addEventListener('mousedown', handleMouseDownRightResize);

        const resizerTop = topRef.current;
        resizerTop?.addEventListener('mousedown', handleMouseDownTopResize);

        const resizerBottom = bottomRef.current;
        resizerBottom?.addEventListener(
            'mousedown',
            handleMouseDownBottomResize,
        );

        const resizerLeft = leftRef.current;
        resizerLeft?.addEventListener('mousedown', handleMouseDownLeftResize);

        const resizerLeftTop = leftTopRef.current;
        resizerLeftTop?.addEventListener(
            'mousedown',
            handleMouseDownLeftTopResize,
        );

        const resizerRightTop = rightTopRef.current;
        resizerRightTop?.addEventListener(
            'mousedown',
            handleMouseDownRightTopResize,
        );

        const resizerRightBottom = rightBottomRef.current;
        resizerRightBottom?.addEventListener(
            'mousedown',
            handleMouseDownRightBottomResize,
        );

        const resizerLeftBottom = leftBottomRef.current;
        resizerLeftBottom?.addEventListener(
            'mousedown',
            handleMouseDownLeftBottomResize,
        );

        workspaceEl.addEventListener('mouseleave', handleCleanUp);

        return () => {
            handleCleanUp();
        };
    }, [ref, workspace, getSize, getTranslate, onUpdateBounds]);

    return {
        leftRef,
        rightRef,
        topRef,
        bottomRef,
        leftTopRef,
        rightTopRef,
        leftBottomRef,
        rightBottomRef,
    };
}
