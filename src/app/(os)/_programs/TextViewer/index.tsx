import type { Process, TextFile } from '@/os/_types/file-system';

import TestMD from '@/app/(blog)/test.mdx';
import Window from '@/os/_components/Window';

interface TextViewerProps {
    process: Process<TextFile>;
}

export default function TextViewer({ process }: TextViewerProps) {
    const { file, windowId } = process;
    return (
        <Window windowId={windowId} title={process.file.name}>
            <TestMD />
        </Window>
    );
}
