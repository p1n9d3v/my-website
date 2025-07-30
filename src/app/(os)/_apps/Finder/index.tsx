import type { Directory } from '@/os/_types/file-system';

import Window from '@/os/_components/Window';
import { useOSStore } from '@/os/_store';

interface FinderProps {
    file: Directory;
}

export default function Finder({ file }: FinderProps) {
    const getWindowByFileId = useOSStore((state) => state.getWindowByFileId);

    const window = getWindowByFileId(file.id);

    return (
        <Window
            window={window}
            renderHeaderContent={
                <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                    <p className="text-xl dark:text-green-500">{file.name}</p>
                </div>
            }
        >
            <p className="text-xl dark:text-green-500">Funcking</p>
        </Window>
    );
}
