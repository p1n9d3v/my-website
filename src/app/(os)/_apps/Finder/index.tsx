import type { Process } from '@/os/_types/file-system';

import Window from '@/os/_components/Window';
import { useOSStore } from '@/os/_store';

interface FinderProps {
    process: Process;
}

export default function Finder({ process }: FinderProps) {
    const { program, windowId } = process;
    const window = useOSStore((state) => state.windows[windowId]);

    return (
        <Window
            window={window}
            renderHeaderContent={
                <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                    <p className="text-xl dark:text-green-500">
                        {program.name}
                    </p>
                </div>
            }
        >
            <p className="text-xl dark:text-green-500">Funcking</p>
        </Window>
    );
}
