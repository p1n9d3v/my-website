import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { useAppSlice, type AppSlice } from './slices/app';

type CombinedState = AppSlice;

export const useOSStore = create<CombinedState>()(
    devtools(
        (...a) => ({
            ...useAppSlice(...a),
        }),
        {
            name: 'OSStore',
        },
    ),
);
