import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import fs from 'node:fs';
import path from 'path';

import type { Directory, File, Markdown } from '../_types/file-system';

// 파일을 읽어 가상 파일 시스템 객체를 생성하는 재귀 함수
export const generateFileSystem = (
    directoryPath: string,
    parentId: string | null = null,
): { entries: Record<string, File>; childrenIds: string[] } => {
    const entries: Record<string, File> = {};
    const childrenIds: string[] = [];

    const items = fs.readdirSync(directoryPath, { withFileTypes: true });

    for (const item of items) {
        const id = nanoid();
        const fullPath = path.join(directoryPath, item.name);

        if (item.isDirectory()) {
            // 하위 디렉터리를 재귀적으로 처리
            const { entries: subEntries, childrenIds: subChildrenIds } =
                generateFileSystem(fullPath, id);

            const directory: Directory = {
                id,
                type: 'directory',
                name: item.name,
                parentId,
                childrenIds: subChildrenIds,
            };

            entries[id] = directory;
            Object.assign(entries, subEntries); // 하위 항목들을 전체 entries에 병합
            childrenIds.push(id);
        } else if (
            item.isFile() &&
            (item.name.endsWith('.md') || item.name.endsWith('.mdx'))
        ) {
            // .md 또는 .mdx 파일만 처리
            const content = fs.readFileSync(fullPath, 'utf-8');
            const textFile: Markdown = {
                id,
                type: 'markdown',
                name: item.name,
                parentId,
                Component: dynamic(() => import('@/app/(blog)/test.mdx')),
            };
            entries[id] = textFile;
            childrenIds.push(id);
        }
    }

    return { entries, childrenIds };
};
