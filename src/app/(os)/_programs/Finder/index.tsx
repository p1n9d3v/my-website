import type { Directory, Process } from '@/os/_types/file-system';

import Launcher from '@/os/_components/Launcher';
import Window from '@/os/_components/Window';
import { useOSContext } from '@/os/_store/provider';

interface FinderProps {
    process: Process<Directory>;
}

export default function Finder({ process }: FinderProps) {
    const { program, windowId } = process;
    const getFiles = useOSContext((state) => state.getFiles);

    const files = getFiles(process.file.childrenIds);

    console.log(process);
    console.log(files);
    return (
        <Window
            contentClassName="finder-window"
            windowId={windowId}
            renderHeaderContent={
                <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                    <p className="text-xl text-green-500">{program.name}</p>
                </div>
            }
        >
            {files.map((file) => (
                <Launcher key={file.id} file={file} bounds=".finder-window" />
            ))}
        </Window>
    );
}
