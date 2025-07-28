import { create } from 'zustand';

import { useAppSlice, type AppSlice } from './slices/app';

type CombinedState = AppSlice;

export const useOSStore = create<CombinedState>((...a) => ({
    ...useAppSlice(...a),
}));
