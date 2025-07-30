'use client';

import { groupBy } from 'lodash';

import { cn } from '@/utils/cn';

import { FINDER, MARKDOWN_VIEWER } from '../../_constants';
import { useOSContext } from '../../_store/provider';
import DockIcon from './DockIcon';

export default function Dock() {
    const _processes = useOSContext((state) => state.processes);
    const unhideWindow = useOSContext((state) => state.unhideWindow);

    //TODO: Finder, Terminal is default programs
    const defaultPrograms = [FINDER, MARKDOWN_VIEWER];

    const runningPrograms = groupBy(Object.values(_processes), 'program.id');

    return (
        <div
            className={cn(
                'fixed bottom-2.5 left-1/2 z-40 -translate-x-1/2 transform',
                'border border-white/20 bg-white/10 backdrop-blur-md',
                'rounded-2xl shadow-lg shadow-black/20',
            )}
        >
            <div className="flex gap-2 px-4 py-2">
                {defaultPrograms.map((program) => (
                    <DockIcon key={program.id} program={program} />
                ))}

                {/*DESC: Divider */}
                {Object.keys(runningPrograms).length > 0 && (
                    <div className="w-0.5 flex-1 bg-white" />
                )}

                {Object.keys(runningPrograms).map((processId) => {
                    const processes = runningPrograms[processId];
                    const process = processes[0];
                    const windowIds = processes.map(
                        (process) => process.windowId,
                    );
                    return (
                        <DockIcon
                            key={process.id}
                            program={process.program}
                            processCount={runningPrograms[processId].length}
                            onClick={() => unhideWindow(windowIds)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
