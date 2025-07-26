import { nanoid } from 'nanoid';
import { immer } from 'zustand/middleware/immer';

import type { Window } from '../../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../../_constants';

export interface WindowStoreStates {
    windows: Record<string, Window>;
    activeWindowId: string;
    zIndexCounter: number;
}

export interface WindowStoreActions {
    registerWindow: (process: { name: string; id: string }) => void;
    activateWindow: (windowId: string) => void;
    closeWindow: (windowId: string) => void;
    hideWindow: (windowId: string) => void;
}

export type WindowSlice = WindowStoreStates & WindowStoreActions;

export const useWindowSlice = immer<WindowSlice>((set) => ({
    windows: {},
    activeWindowId: '',
    zIndexCounter: 0,
    registerWindow: (process) => {
        const windowId = nanoid();
        const position = {
            x: window.innerWidth / 2 - MIN_WIDTH / 2,
            y: window.innerHeight / 2 - MIN_HEIGHT / 2,
        };
        const size = {
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        };

        set((state) => {
            state.windows[windowId] = {
                id: windowId,
                position,
                size,
                process,
                zIndex: state.zIndexCounter,
                isHide: false,
            };
            state.zIndexCounter++;
        });
    },
    hideWindow: (windowId) => {
        set((state) => {
            state.windows[windowId].isHide = true;
        });
    },
    activateWindow: (windowId) => {
        set((state) => {
            state.activeWindowId = windowId;
            if (state.windows[windowId]) {
                state.windows[windowId].zIndex = state.zIndexCounter;
                state.zIndexCounter++;
            }
        });
    },
    closeWindow: (windowId) => {
        set((state) => {
            delete state.windows[windowId];
        });
    },
}));
