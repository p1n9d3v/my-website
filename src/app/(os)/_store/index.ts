import { create } from 'zustand';

import { useWindowSlice, type WindowSlice } from './slices/window';

type CombinedState = WindowSlice;

export const useOSStore = create<CombinedState>((...a) => ({
    ...useWindowSlice(...a),
}));
