import { immer } from 'zustand/middleware/immer';

import type { Process } from '../../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../../_constants';

export interface ProcessStoreStates {
    processes: Record<string, Process>;
    focusedProcess: string;
    focusCounter: number;
}

export interface ProcessStoreActions {
    launchProgram: (process: { name: string; id: string }) => void;
    focusProcess: (windowId: string) => void;
    closeProcess: (windowId: string) => void;
    hideProcess: (windowId: string) => void;
}

export type ProcessSlice = ProcessStoreStates & ProcessStoreActions;

export const useProcessSlice = immer<ProcessSlice>((set) => ({
    processes: {},
    focusedProcess: '',
    focusCounter: 0,
    launchProgram: (process) => {
        const windowPosition = {
            x: window.innerWidth / 2 - MIN_WIDTH / 2,
            y: window.innerHeight / 2 - MIN_HEIGHT / 2,
        };
        const windowSize = {
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        };

        set((state) => {
            state.processes[process.id] = {
                id: process.id,
                name: process.name,
                window: {
                    position: windowPosition,
                    size: windowSize,
                    isHide: false,
                    zIndex: state.focusCounter,
                },
            };
            state.focusCounter++;
        });
    },
    hideProcess: (windowId) => {
        set((state) => {
            state.processes[windowId].window.isHide = true;
        });
    },
    focusProcess: (windowId) => {
        set((state) => {
            state.focusedProcess = windowId;
            if (state.processes[windowId]) {
                state.processes[windowId].window.zIndex = state.focusCounter;
                state.focusCounter++;
            }
        });
    },
    closeProcess: (windowId) => {
        set((state) => {
            delete state.processes[windowId];
        });
    },
}));
