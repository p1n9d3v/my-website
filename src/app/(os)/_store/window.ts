import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Position, Size, Window } from '../_types';

import { MIN_HEIGHT, MIN_WIDTH } from '../_constants';

interface WindowStoreStates {
    windows: Record<string, Window>;
    activeWindowId: string;
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
        registerWindow: (process) => {
            const windowId = nanoid();
            const position = {
                x: window.innerWidth / 2 - MIN_WIDTH / 2,
                y: window.innerHeight / 2 - MIN_HEIGHT / 2,
            };

            const size = { width: MIN_WIDTH, height: MIN_HEIGHT };
            set((state) => ({
                windows: {
                    ...state.windows,
                    [windowId]: {
                        size,
                        position,
                        id: windowId,
                        process,
                    },
                },
            }));
        },
        updateWindowRect: (windowId, bounds) => {},
        activateWindow: (windowId) => {},
        closeWindow: (windowId) => {},
    })),
);
