import { useEffect, useRef, type RefObject } from 'react';

import { MIN_HEIGHT, MIN_WIDTH } from '../_constants';

interface UseWindowResizeProps {
    ref: RefObject<HTMLDivElement | null>;
}

export default function useWindowResize({ ref }: UseWindowResizeProps) {
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const leftTopRef = useRef<HTMLDivElement>(null);
    const rightTopRef = useRef<HTMLDivElement>(null);
    const leftBottomRef = useRef<HTMLDivElement>(null);
    const rightBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizableEl = ref.current;
        if (!resizableEl) return;

        let initialMouseX = 0;
        let initialMouseY = 0;
        let initialElemWidth = 0;
        let initialElemHeight = 0;
        let initialElemLeft = 0;
        let initialElemTop = 0;

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

        //NOTE: RIGHT
        const handleMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX;
            const newWidth = initialElemWidth + dx;
            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
        };
        const handleMouseDownRightResize = (event: MouseEvent) => {
            initialMouseX = event.clientX;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth = parseInt(styles.width, 10);
            document.addEventListener('mousemove', handleMouseMoveRightResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: TOP
        const handleMouseMoveTopResize = (event: MouseEvent) => {
            const dy = initialMouseY - event.clientY;
            const newHeight = initialElemHeight + dy;
            const newTop = initialElemTop - dy;

            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
                resizableEl.style.top = `${newTop}px`;
            }
        };
        const handleMouseDownTopResize = (event: MouseEvent) => {
            initialMouseY = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemHeight = parseInt(styles.height, 10);
            initialElemTop = parseInt(styles.top, 10);
            document.addEventListener('mousemove', handleMouseMoveTopResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: BOTTOM
        const handleMouseMoveBottomResize = (event: MouseEvent) => {
            const dy = event.clientY - initialMouseY;
            const newHeight = initialElemHeight + dy;
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };
        const handleMouseDownBottomResize = (event: MouseEvent) => {
            initialMouseY = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemHeight = parseInt(styles.height, 10);
            document.addEventListener('mousemove', handleMouseMoveBottomResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: LEFT
        const handleMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = initialMouseX - event.clientX;
            const newWidth = initialElemWidth + dx;
            const newLeft = initialElemLeft - dx;
            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
                resizableEl.style.left = `${newLeft}px`;
            }
        };
        const handleMouseDownLeftResize = (event: MouseEvent) => {
            initialMouseX = event.clientX;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth = parseInt(styles.width, 10);
            initialElemLeft = parseInt(styles.left, 10);
            document.addEventListener('mousemove', handleMouseMoveLeftResize);
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: LEFT TOP
        const handleMouseMoveLeftTopResize = (event: MouseEvent) => {
            const dx = initialMouseX - event.clientX;
            const newWidth = initialElemWidth + dx;
            const newLeft = initialElemLeft - dx;

            const dy = initialMouseY - event.clientY;
            const newHeight = initialElemHeight + dy;
            const newTop = initialElemTop - dy;

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
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth = parseInt(styles.width, 10);
            initialElemHeight = parseInt(styles.height, 10);
            initialElemLeft = parseInt(styles.left, 10);
            initialElemTop = parseInt(styles.top, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveLeftTopResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: RIGHT TOP
        const handleMouseMoveRightTopResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX;
            const newWidth = initialElemWidth + dx;

            const dy = initialMouseY - event.clientY;
            const newHeight = initialElemHeight + dy;
            const newTop = initialElemTop - dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
                resizableEl.style.top = `${newTop}px`;
            }
        };
        const handleMouseDownRightTopResize = (event: MouseEvent) => {
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth = parseInt(styles.width, 10);
            initialElemHeight = parseInt(styles.height, 10);
            initialElemLeft = parseInt(styles.left, 10);
            initialElemTop = parseInt(styles.top, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveRightTopResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: RIGHT BOTTOM
        const handleMouseMoveRightBottomResize = (event: MouseEvent) => {
            const dx = event.clientX - initialMouseX;
            const newWidth = initialElemWidth + dx;

            const dy = event.clientY - initialMouseY;
            const newHeight = initialElemHeight + dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };
        const handleMouseDownRightBottomResize = (event: MouseEvent) => {
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth = parseInt(styles.width, 10);
            initialElemHeight = parseInt(styles.height, 10);
            document.addEventListener(
                'mousemove',
                handleMouseMoveRightBottomResize,
            );
            document.addEventListener('mouseup', handleMouseUp);
        };

        //NOTE: LEFT BOTTOM
        const handleMouseMoveLeftBottomResize = (event: MouseEvent) => {
            const dx = initialMouseX - event.clientX;
            const newWidth = initialElemWidth + dx;
            const newLeft = initialElemLeft - dx;

            const dy = event.clientY - initialMouseY;
            const newHeight = initialElemHeight + dy;

            if (newWidth >= MIN_WIDTH) {
                resizableEl.style.width = `${newWidth}px`;
                resizableEl.style.left = `${newLeft}px`;
            }
            if (newHeight >= MIN_HEIGHT) {
                resizableEl.style.height = `${newHeight}px`;
            }
        };
        const handleMouseDownLeftBottomResize = (event: MouseEvent) => {
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            const styles = window.getComputedStyle(resizableEl);
            initialElemWidth = parseInt(styles.width, 10);
            initialElemHeight = parseInt(styles.height, 10);
            initialElemLeft = parseInt(styles.left, 10);
            initialElemTop = parseInt(styles.top, 10);
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

        return () => {
            handleMouseUp();
        };
    }, [ref]);

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
