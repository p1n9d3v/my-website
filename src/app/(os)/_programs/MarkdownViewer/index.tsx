import type { Process, Markdown } from '@/os/_types/file-system';

import TestMD from '@/app/(blog)/test.mdx';
import Window from '@/os/_components/Window';

interface MarkdownViewerProps {
    process: Process<Markdown>;
}

export default function MarkdownViewer({ process }: MarkdownViewerProps) {
    const { file, windowId } = process;

    return (
        <Window windowId={windowId} title={process.file.name}>
            <TestMD />
        </Window>
    );
}
