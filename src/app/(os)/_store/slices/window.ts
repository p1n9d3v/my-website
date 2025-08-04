import type { StateCreator } from 'zustand';

import type { Bounds, Window } from '@/os/_types/window';

import type { OSStoreState } from '..';

import { MIN_HEIGHT, MIN_WIDTH } from '../../_constants';

export interface WindowStoreStates {
    data: Record<string, Window>;
    zindex: number;
}

export interface WindowStoreActions {
    open: (windowId: string, processId: string) => void;
    hide: (windowId: string) => void;
    unhide: (windowIds: string[]) => void;
    close: (windowId: string) => void;
    active: (windowId: string) => void;
    update: (windowId: string, bounds: Partial<Bounds>) => void;
}

export type WindowSlice = WindowStoreStates & {
    actions: WindowStoreActions;
};

export const createWindowSlice: StateCreator<
    OSStoreState,
    [['zustand/immer', never]],
    [],
    WindowSlice
> = (set, get) => ({
    data: {},
    zindex: 0,
    actions: {
        update: (windowId, bounds) => {
            set((state) => {
                state.window.data[windowId].bounds = {
                    ...state.window.data[windowId].bounds,
                    ...bounds,
                };
            });
        },
        active: (windowId) => {
            set((state) => {
                state.window.data[windowId].zIndex = state.window.zindex++;
            });
        },
        open: (windowId, processId) => {
            set((state) => {
                const bounds = {
                    x: 200,
                    y: 400,
                    width: MIN_WIDTH,
                    height: MIN_HEIGHT,
                };

                state.window.data[windowId] = {
                    id: windowId,
                    bounds,
                    processId,
                    zIndex: state.window.zindex++,
                    isHide: false,
                };
            });
        },
        close: (windowId) => {
            set((state) => {
                delete state.window.data[windowId];
            });
        },
        hide: (windowId) => {
            set((state) => {
                state.window.data[windowId].isHide = true;
            });
        },
        unhide: (windowIds) => {
            set((state) => {
                windowIds.forEach((windowId) => {
                    state.window.data[windowId].isHide = false;
                });
            });
        },
    },
});
