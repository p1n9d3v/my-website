import { immer } from 'zustand/middleware/immer';

import type { App, AppContext, Bounds } from '@/os/_types';

import { APPS, MIN_HEIGHT, MIN_WIDTH } from '@/os/_constants';

export interface AppStoreStates {
    apps: Record<string, App>;
    runningAppIds: string[];
    appContexts: Record<string, AppContext>;
    activeAppId: string;
    activeCounter: number; //DESC: 앱 순서 정렬 용
}

export interface AppStoreActions {
    launchApp: (appId: string) => void;
    activeApp: (appId: string) => void;
    terminateApp: (appId: string) => void;
    hideApp: (appId: string) => void;
    updateWindowBounds: ({
        appId,
        bounds,
        prevBounds,
        isMaximized,
    }: {
        appId: string;
        bounds: Bounds;
        isMaximized?: boolean;
        prevBounds?: Bounds;
    }) => void;
}

export type AppSlice = AppStoreStates & AppStoreActions;

export const useAppSlice = immer<AppSlice>((set) => ({
    apps: APPS,
    appContexts: {},
    runningAppIds: [],
    activeAppId: '',
    activeCounter: 0,
    launchApp: (appId) => {
        set((state) => {
            let context = state.appContexts[appId];
            if (!context) {
                const { name } = state.apps[appId];

                const bounds = {
                    x: window.innerWidth / 2 - MIN_WIDTH / 2,
                    y: window.innerHeight / 2 - MIN_HEIGHT / 2,
                    width: MIN_WIDTH,
                    height: MIN_HEIGHT,
                };
                context = {
                    id: appId,
                    name: name,
                    window: {
                        bounds,
                        isHide: false,
                        zIndex: state.activeCounter,
                        isMaximized: false,
                    },
                };
            }

            state.runningAppIds.push(appId);
            state.appContexts[appId] = context;
            state.activeCounter++;
        });
    },
    hideApp: (appId) => {
        set((state) => {
            state.appContexts[appId].window.isHide = true;
        });
    },
    activeApp: (appId) => {
        set((state) => {
            state.activeAppId = appId;
            if (state.appContexts[appId]) {
                state.appContexts[appId].window.zIndex = state.activeCounter;
                state.activeCounter++;
            }
        });
    },
    terminateApp: (appId) => {
        set((state) => {
            state.runningAppIds = state.runningAppIds.filter(
                (runningAppId) => runningAppId !== appId,
            );
        });
    },
    updateWindowBounds: ({ appId, bounds, prevBounds, isMaximized }) => {
        set((state) => {
            state.appContexts[appId].window.bounds = bounds;
            if (isMaximized) {
                state.appContexts[appId].window.prevBounds = prevBounds;
            } else {
                state.appContexts[appId].window.prevBounds = undefined;
            }
            state.appContexts[appId].window.isMaximized = isMaximized ?? false;
        });
    },
}));
