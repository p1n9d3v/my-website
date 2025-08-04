import type { StateCreator } from 'zustand';

import type { File, Process, Program } from '@/os/_types/file-system';

import type { OSStoreState } from '..';

export interface ProcessStoreStates {
    data: Record<string, Process>;
}

export interface ProcessStoreActions {
    launch: ({
        processId,
        windowId,
        program,
        file,
    }: {
        processId: string;
        windowId: string;
        program: Program;
        file: File;
    }) => void;
    terminate: (processId: string) => void;
}

export type ProcessSlice = ProcessStoreStates & {
    actions: ProcessStoreActions;
};

export const createProcessSlice: StateCreator<
    OSStoreState,
    [['zustand/immer', never]],
    [],
    ProcessSlice
> = (set) => ({
    data: {},
    actions: {
        launch: ({ processId, program, windowId, file }) => {
            set((state) => {
                state.process.data[processId] = {
                    id: processId,
                    program,
                    windowId,
                    file,
                };
            });
        },
        terminate: (processId) => {
            set((state) => {
                delete state.process.data[processId];
            });
        },
    },
});
