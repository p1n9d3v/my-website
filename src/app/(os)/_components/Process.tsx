import type { Directory, File, Markdown, Process } from '../_data/file-system';

import Finder from '../_programs/Finder';
import MarkdownViewer from '../_programs/MarkdownViewer';

interface ProgramProps {
    process: Process<File>;
}
export default function Process({ process }: ProgramProps) {
    const { file } = process;
    console.log(process);

    switch (file.program) {
        case 'Finder':
            return <Finder process={process as Process<Directory>} />;
        case 'MarkdownViewer':
            return <MarkdownViewer process={process as Process<Markdown>} />;
    }

    throw new Error('not supported program');
}
