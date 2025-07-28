import { immer } from 'zustand/middleware/immer';

import type { App } from '../../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../../_constants';

export interface AppStoreStates {
    runningApps: Record<string, App>;
    focusedAppId: string;
    zIndexCounter: number;
}

export interface AppStoreActions {
    launchApp: (process: { name: string; id: string }) => void;
    activeApp: (appId: string) => void;
    terminateApp: (appId: string) => void;
    hideApp: (appId: string) => void;
}

export type AppSlice = AppStoreStates & AppStoreActions;

export const useAppSlice = immer<AppSlice>((set) => ({
    runningApps: {},
    focusedAppId: '',
    zIndexCounter: 0,
    launchApp: (process) => {
        const windowPosition = {
            x: window.innerWidth / 2 - MIN_WIDTH / 2,
            y: window.innerHeight / 2 - MIN_HEIGHT / 2,
        };
        const windowSize = {
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        };

        set((state) => {
            state.runningApps[process.id] = {
                id: process.id,
                name: process.name,
                window: {
                    position: windowPosition,
                    size: windowSize,
                    isHide: false,
                    zIndex: state.zIndexCounter,
                },
            };
            state.zIndexCounter++;
        });
    },
    hideApp: (windowId) => {
        set((state) => {
            state.runningApps[windowId].window.isHide = true;
        });
    },
    activeApp: (windowId) => {
        set((state) => {
            state.focusedAppId = windowId;
            if (state.runningApps[windowId]) {
                state.runningApps[windowId].window.zIndex = state.zIndexCounter;
                state.zIndexCounter++;
            }
        });
    },
    terminateApp: (windowId) => {
        set((state) => {
            delete state.runningApps[windowId];
        });
    },
}));
