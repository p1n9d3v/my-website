'use client';

import { groupBy } from 'lodash';

import { cn } from '@/utils/cn';

import { useOSStore } from '../../_store';
import DockIcon from './DockIcon';

export default function Dock() {
    const processes = useOSStore((state) => state.process.data);
    const unhideWindow = useOSStore((state) => state.window.actions.unhide);

    //TODO: Finder, Terminal is default programs

    const runningPrograms = groupBy(Object.values(processes), 'file.id');

    return (
        <div
            className={cn(
                'fixed bottom-2.5 left-1/2 z-40 -translate-x-1/2 transform',
                'border border-white/20 bg-white/10 backdrop-blur-md',
                'rounded-2xl shadow-lg shadow-black/20',
            )}
        >
            <div className="flex gap-2 px-4 py-2">
                {Object.keys(runningPrograms).map((processId) => {
                    const processes = runningPrograms[processId];
                    const process = processes[0];
                    const windowIds = processes.map(
                        (process) => process.windowId,
                    );
                    return (
                        <DockIcon
                            key={process.id}
                            file={process.file}
                            processCount={runningPrograms[processId].length}
                            onClick={() => unhideWindow(windowIds)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
