'use client';

import { cn } from '@/utils/cn';

import { FINDER, MARKDOWN_VIEWER } from '../../_constants';
import { useOSContext } from '../../_store/provider';
import DockIcon from './DockIcon';

export default function Dock() {
    const processes = useOSContext((state) => state.processes);

    //TODO: Finder, Terminal is default programs
    const defaultPrograms = [FINDER, MARKDOWN_VIEWER];

    const processesList = Object.values(processes);
    return (
        <div
            className={cn(
                'fixed bottom-2.5 left-1/2 z-40 -translate-x-1/2 transform',
                'border border-white/20 bg-white/10 backdrop-blur-md',
                'rounded-2xl shadow-lg shadow-black/20',
            )}
        >
            <div className="flex gap-2 px-4 py-3">
                {defaultPrograms.map((program) => (
                    <DockIcon key={program.id} program={program} />
                ))}

                {/*DESC: Divider */}
                {processesList.length > 0 && (
                    <div className="w-0.5 flex-1 bg-white" />
                )}

                {processesList.map((process) => (
                    <DockIcon
                        key={process.id}
                        program={process.program}
                        isRunning
                    />
                ))}
            </div>
        </div>
    );
}
