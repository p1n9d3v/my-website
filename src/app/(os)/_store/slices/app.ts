import { immer } from 'zustand/middleware/immer';

import type { App, FileContext, Bounds } from '@/os/_types';

import { APPS, MIN_HEIGHT, MIN_WIDTH } from '@/os/_constants';

export interface AppStoreStates {
    runningAppIds: string[];
    appContexts: Record<string, FileContext>;
    activeAppId: string;
    activeCounter: number; //DESC: 앱 순서 정렬 용
}

export interface AppStoreActions {
    launchApp: (appId: string) => void;
    activeApp: (appId: string) => void;
    terminateApp: (appId: string) => void;
    hideApp: (appId: string) => void;
    dragWindow: (appId: string, bounds: Pick<Bounds, 'x' | 'y'>) => void;
    resizeWindow: (appId: string, bounds: Bounds) => void;
    maximizeWindow: ({
        appId,
        bounds,
        prevBounds,
    }: {
        appId: string;
        bounds: Bounds;
        prevBounds?: Bounds;
    }) => void;
    restoreWindow: (appId: string) => void;
}

export type AppSlice = AppStoreStates & AppStoreActions;

export const useAppSlice = immer<AppSlice>((set) => ({
    appContexts: {},
    runningAppIds: [],
    activeAppId: '',
    activeCounter: 0,
    launchApp: (appId) => {
        set((state) => {
            let context = state.appContexts[appId];
            if (!context) {
                const { name } = APPS[appId];

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
    dragWindow: (appId, bounds) => {
        set((state) => {
            state.appContexts[appId].window.bounds = {
                ...state.appContexts[appId].window.bounds,
                ...bounds,
            };
        });
    },
    resizeWindow: (appId, bounds) => {
        set((state) => {
            const window = state.appContexts[appId].window;

            window.bounds = bounds;
            window.prevBounds = undefined;
            window.isMaximized = false;
        });
    },
    maximizeWindow: ({ appId, bounds, prevBounds }) => {
        set((state) => {
            const window = state.appContexts[appId].window;
            window.bounds = bounds;
            window.prevBounds = prevBounds ?? window.prevBounds;
            window.isMaximized = true;
        });
    },
    restoreWindow: (appId) => {
        set((state) => {
            const window = state.appContexts[appId].window;
            window.bounds = window.prevBounds!;
            window.prevBounds = undefined;
            window.isMaximized = false;
        });
    },
}));
