import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Position, Size, Window } from '../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../_constants';

interface WindowStoreStates {
    windows: Record<string, Window>;
    activeWindowId: string;
    zIndexCounter: number;
}

interface WindowStoreActions {
    registerWindow: (process: { name: string; id: string }) => void;
    updateWindowRect: (
        windowId: string,
        bounds: Partial<Position & Size>,
    ) => void;
    activateWindow: (windowId: string) => void;
    closeWindow: (windowId: string) => void;
}

export const useWindowStore = create<WindowStoreStates & WindowStoreActions>()(
    immer((set) => ({
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
                };
                state.zIndexCounter++;
            });
        },
        updateWindowRect: (windowId, bounds) => {
            set((state) => {
                const targetWindow = state.windows[windowId];
                if (!targetWindow) return;

                targetWindow.position = {
                    x: bounds.x ?? targetWindow.position.x,
                    y: bounds.y ?? targetWindow.position.y,
                };
                targetWindow.size = {
                    width: bounds.width ?? targetWindow.size.width,
                    height: bounds.height ?? targetWindow.size.height,
                };
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
    })),
);
