import { immer } from 'zustand/middleware/immer';

import type { Bounds, Window } from '@/os/_types/window';

import { MIN_HEIGHT, MIN_WIDTH } from '../../_constants';

export interface WindowStoreStates {
    windows: Record<string, Window>;
    windowZIndex: number;
    activeWindowId: string;
}

export interface WindowStoreActions {
    openWindow: (windowId: string, processId: string) => void;
    dragWindow: (windowId: string, bounds: Pick<Bounds, 'x' | 'y'>) => void;
    resizeWindow: (windowId: string, bounds: Bounds) => void;
    maximizeWindow: ({
        windowId,
        bounds,
        prevBounds,
    }: {
        windowId: string;
        bounds: Bounds;
        prevBounds?: Bounds;
    }) => void;
    restoreWindow: (windowId: string) => void;
    hideWindow: (windowId: string) => void;
    closeWindow: (windowId: string) => void;
    activateWindow: (windowId: string) => void;
}

export type WindowSlice = WindowStoreStates & WindowStoreActions;

export const useWindowSlice = immer<WindowSlice>((set, get) => ({
    windows: {},
    windowZIndex: 0,
    activeWindowId: '',
    activateWindow: (windowId) => {
        set((state) => {
            state.activeWindowId = windowId;
            state.windows[windowId].zIndex = state.windowZIndex++;
        });
    },
    openWindow: (windowId, processId) => {
        set((state) => {
            const bounds = {
                x: window.innerWidth / 2 - MIN_WIDTH / 2,
                y: window.innerHeight / 2 - MIN_HEIGHT / 2,
                width: MIN_WIDTH,
                height: MIN_HEIGHT,
            };

            state.windows[windowId] = {
                id: windowId,
                bounds,
                processId,
                prevBounds: null,
                zIndex: state.windowZIndex++,
                isHide: false,
                isMaximized: false,
            };
        });
    },
    closeWindow: (windowId) => {
        set((state) => {
            delete state.windows[windowId];
        });
    },
    hideWindow: (windowId) => {
        set((state) => {
            state.windows[windowId].isHide = true;
        });
    },
    dragWindow: (windowId, bounds) => {
        set((state) => {
            const window = state.windows[windowId];
            window.bounds = {
                ...window.bounds,
                ...bounds,
            };
        });
    },
    resizeWindow: (windowId, bounds) => {
        set((state) => {
            const window = state.windows[windowId];

            window.bounds = bounds;
            window.prevBounds = null;
            window.isMaximized = false;
        });
    },
    maximizeWindow: ({ windowId, bounds, prevBounds }) => {
        set((state) => {
            const window = state.windows[windowId];
            window.bounds = bounds;
            window.prevBounds = prevBounds ?? window.prevBounds;
            window.isMaximized = true;
        });
    },
    restoreWindow: (windowId) => {
        set((state) => {
            const window = state.windows[windowId];
            window.bounds = window.prevBounds!;
            window.prevBounds = null;
            window.isMaximized = false;
        });
    },
}));
