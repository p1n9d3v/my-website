import { immer } from 'zustand/middleware/immer';

import type { App, AppContext, Position, Size } from '@/os/_types';

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
    updateWindowRect: (
        appId: string,
        rect: {
            position?: Position;
            size?: Size;
        },
    ) => void;
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
                const windowPosition = {
                    x: window.innerWidth / 2 - MIN_WIDTH / 2,
                    y: window.innerHeight / 2 - MIN_HEIGHT / 2,
                };
                const windowSize = {
                    width: MIN_WIDTH,
                    height: MIN_HEIGHT,
                };
                context = {
                    id: appId,
                    name: name,
                    window: {
                        position: windowPosition,
                        size: windowSize,
                        isHide: false,
                        zIndex: state.activeCounter,
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
    updateWindowRect: (appId, rect) => {
        set((state) => {
            state.appContexts[appId].window = {
                ...state.appContexts[appId].window,
                position: {
                    x:
                        rect.position?.x ??
                        state.appContexts[appId].window.position.x,
                    y:
                        rect.position?.y ??
                        state.appContexts[appId].window.position.y,
                },
                size: {
                    width:
                        rect.size?.width ??
                        state.appContexts[appId].window.size.width,
                    height:
                        rect.size?.height ??
                        state.appContexts[appId].window.size.height,
                },
            };
        });
    },
}));
