import { useEffect, useRef, type RefObject } from 'react';

import { MIN_HEIGHT, MIN_WIDTH } from '../_constants';

interface UseWindowResizeProps {
    ref: RefObject<HTMLDivElement | null>;
    workspace: string;
}

export default function useWindowResize({
    ref,
    workspace,
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

    useEffect(() => {
        const resizableEl = ref.current;
        const workspaceEl = document.querySelector(workspace);
        if (!resizableEl || !workspaceEl) return;

        const handleMouseUp = () => {
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

            document.removeEventListener('mouseup', handleMouseUp);
        };

        // NOTE: RIGHT
        const handleMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX.current;
            const newWidth = initialElemWidth.current + dx;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
        };

        const handleMouseDownRightResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth.current = parseInt(styles.width, 10);
            document.addEventListener('mousemove', handleMouseMoveRightResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        // NOTE: TOP
        const handleMouseMoveTopResize = (event: MouseEvent) => {
            const dy = initialMouseY.current - event.clientY;
            const newHeight = initialElemHeight.current + dy;
            const newTop = initialElemTop.current - dy;

            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
                resizableEl.style.top = `${newTop}px`;
            }
        };

        const handleMouseDownTopResize = (event: MouseEvent) => {
            initialMouseY.current = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemHeight.current = parseInt(styles.height, 10);
            initialElemTop.current = parseInt(styles.top, 10);
            document.addEventListener('mousemove', handleMouseMoveTopResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        // NOTE: BOTTOM
        const handleMouseMoveBottomResize = (event: MouseEvent) => {
            const dy = event.clientY - initialMouseY.current;
            const newHeight = initialElemHeight.current + dy;

            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };

        const handleMouseDownBottomResize = (event: MouseEvent) => {
            initialMouseY.current = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemHeight.current = parseInt(styles.height, 10);
            document.addEventListener('mousemove', handleMouseMoveBottomResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        // NOTE: LEFT
        const handleMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = initialMouseX.current - event.clientX;
            const newWidth = initialElemWidth.current + dx;
            const newLeft = initialElemLeft.current - dx;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
                resizableEl.style.left = `${newLeft}px`;
            }
        };

        const handleMouseDownLeftResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth.current = parseInt(styles.width, 10);
            initialElemLeft.current = parseInt(styles.left, 10);
            document.addEventListener('mousemove', handleMouseMoveLeftResize);
            document.addEventListener('mouseup', handleMouseUp);
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
                resizableEl.style.left = `${newLeft}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
                resizableEl.style.top = `${newTop}px`;
            }
        };

        const handleMouseDownLeftTopResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth.current = parseInt(styles.width, 10);
            initialElemHeight.current = parseInt(styles.height, 10);
            initialElemLeft.current = parseInt(styles.left, 10);
            initialElemTop.current = parseInt(styles.top, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveLeftTopResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
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
                resizableEl.style.top = `${newTop}px`;
            }
        };

        const handleMouseDownRightTopResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth.current = parseInt(styles.width, 10);
            initialElemHeight.current = parseInt(styles.height, 10);
            initialElemLeft.current = parseInt(styles.left, 10);
            initialElemTop.current = parseInt(styles.top, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveRightTopResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
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

        const handleMouseDownRightBottomResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth.current = parseInt(styles.width, 10);
            initialElemHeight.current = parseInt(styles.height, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveRightBottomResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
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
                resizableEl.style.left = `${newLeft}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };

        const handleMouseDownLeftBottomResize = (event: MouseEvent) => {
            initialMouseX.current = event.clientX;
            initialMouseY.current = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth.current = parseInt(styles.width, 10);
            initialElemHeight.current = parseInt(styles.height, 10);
            initialElemLeft.current = parseInt(styles.left, 10);
            initialElemTop.current = parseInt(styles.top, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveLeftBottomResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
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

        workspaceEl.addEventListener('mouseleave', handleMouseUp);

        return () => {
            // Clean up all event listeners when the component unmounts
            resizerRight?.removeEventListener(
                'mousedown',
                handleMouseDownRightResize,
            );
            resizerTop?.removeEventListener(
                'mousedown',
                handleMouseDownTopResize,
            );
            resizerBottom?.removeEventListener(
                'mousedown',
                handleMouseDownBottomResize,
            );
            resizerLeft?.removeEventListener(
                'mousedown',
                handleMouseDownLeftResize,
            );
            resizerLeftTop?.removeEventListener(
                'mousedown',
                handleMouseDownLeftTopResize,
            );
            resizerRightTop?.removeEventListener(
                'mousedown',
                handleMouseDownRightTopResize,
            );
            resizerRightBottom?.removeEventListener(
                'mousedown',
                handleMouseDownRightBottomResize,
            );
            resizerLeftBottom?.removeEventListener(
                'mousedown',
                handleMouseDownLeftBottomResize,
            );
            handleMouseUp(); // This will remove the mousemove and mouseup listeners
            workspaceEl.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [ref, workspace]); // Added workspace to the dependency array as it's used in the effect

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
