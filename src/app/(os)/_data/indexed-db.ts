import type { EntityTable } from 'dexie';

import Dexie from 'dexie';

interface Node {
    id: string;
    path: string;
    type: string; // markdown, directory, program
    name: string;
}

const indexedDB = new Dexie('os') as Dexie & {
    fs: EntityTable<Node, 'id'>;
};

indexedDB.version(1).stores({
    fs: '++id',
});

export default indexedDB;
