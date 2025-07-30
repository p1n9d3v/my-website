import { immer } from 'zustand/middleware/immer';

import type { File, Process, Program } from '@/os/_types/file-system';

export interface ProcessStoreStates {
    processes: Record<string, Process>;
}

export interface ProcessStoreActions {
    launchProgram: ({
        processId,
        windowId,
        program,
        file,
    }: {
        processId: string;
        windowId: string;
        program: Program;
        file?: File;
    }) => void;
    terminateProcess: (processId: string) => void;
}

export type ProcessSlice = ProcessStoreStates & ProcessStoreActions;

export const useAppSlice = immer<ProcessSlice>((set) => ({
    processes: {},
    launchProgram: ({ processId, program, windowId, file }) => {
        set((state) => {
            state.processes[processId] = {
                id: processId,
                program,
                windowId,
                file,
            };
        });
    },
    terminateProcess: (processId) => {
        set((state) => {
            delete state.processes[processId];
        });
    },
}));
