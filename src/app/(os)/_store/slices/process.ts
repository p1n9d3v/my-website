import type { StateCreator } from 'zustand';

import { nanoid } from 'nanoid';

import type { File, Process } from '@/os/_data/file-system';

import type { OSStoreState } from '..';

export interface ProcessStoreStates {
    data: Record<string, Process>;
}

export interface ProcessStoreActions {
    launch: (file: File) => void;
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
> = (set, get) => ({
    data: {},
    actions: {
        launch: (file) => {
            const processId = nanoid();
            const windowId = nanoid();
            set((state) => {
                state.process.data[processId] = {
                    id: processId,
                    windowId,
                    file,
                };
            });

            const { window } = get();
            window.actions.open(windowId, processId);
        },
        terminate: (processId) => {
            set((state) => {
                delete state.process.data[processId];
            });
        },
    },
});
