import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { File } from '../_types/file-system';
import type { WindowSlice } from './slices/window';

import {
    createFileSystemSlice,
    type FileSystemSlice,
} from './slices/file-system';
import { createProcessSlice, type ProcessSlice } from './slices/process';
import { createWindowSlice } from './slices/window';

export type OSStoreState = {
    window: WindowSlice;
};

export const createOSStore = (initialNodes: Record<string, File>) => {
    return createStore<OSStoreState>()(
        devtools(
            immer((...a) => ({
                // devtools 바로 다음에 immer로 감싸줍니다.
                window: createWindowSlice(...a), // 이제 window 슬라이스는 객체가 아닌 함수가 반환하는 값을 그대로 사용
                ...createProcessSlice(...a),
                ...createFileSystemSlice(initialNodes)(...a),
            })),
            {
                name: 'OSStore',
            },
        ),
    );
};
