import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import fs from 'node:fs';
import path from 'path';

import type { Directory, File, Markdown } from '../_types/file-system';

import { BLOG_DIRECTORY } from '../_constants';

export const generateBlogFileSystem = (
    directoryPath: string,
    parentId: string | null = null,
): { nodes: Record<string, File>; childrenIds: string[] } => {
    const nodes: Record<string, File> = {};
    const childrenIds: string[] = [];

    const items = fs.readdirSync(directoryPath, { withFileTypes: true });

    for (const item of items) {
        const id = nanoid();
        const fullPath = path.join(directoryPath, item.name);

        if (item.isDirectory()) {
            // 하위 디렉터리를 재귀적으로 처리
            const { nodes: subEntries, childrenIds: subChildrenIds } =
                generateBlogFileSystem(fullPath, id);

            const directory: Directory = {
                id,
                type: 'directory',
                name: item.name,
                parentId,
                childrenIds: subChildrenIds,
            };

            nodes[id] = directory;
            Object.assign(nodes, subEntries); // 하위 항목들을 전체 entries에 병합
            childrenIds.push(id);
        } else if (
            item.isFile() &&
            (item.name.endsWith('.md') || item.name.endsWith('.mdx'))
        ) {
            const markdownFile: Markdown = {
                id,
                type: 'markdown',
                name: item.name,
                parentId,
                content: fs.readFileSync(fullPath, 'utf-8'),
            };
            nodes[id] = markdownFile;
            BLOG_DIRECTORY.childrenIds.push(id);
            childrenIds.push(id);
        }
    }

    return { nodes, childrenIds };
};
