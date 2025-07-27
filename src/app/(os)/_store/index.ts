import { create } from 'zustand';

import { useProcessSlice, type ProcessSlice } from './slices/window';

type CombinedState = ProcessSlice;

export const useOSStore = create<CombinedState>((...a) => ({
    ...useProcessSlice(...a),
}));
