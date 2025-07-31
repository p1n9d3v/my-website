'use client';
import { evaluate } from '@mdx-js/mdx';
import { MDXProvider } from '@mdx-js/react';
import { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';

import type { Markdown, Process } from '@/os/_types/file-system';

import Window from '@/os/_components/Window';

interface MarkdownViewerProps {
    process: Process<Markdown>;
}

// MDX 컴포넌트 정의
const components = {
    h1: (props: any) => <h1 className="mb-4 text-4xl font-bold" {...props} />,
    h2: (props: any) => (
        <h2 className="mb-3 text-xl font-semibold" {...props} />
    ),
    p: (props: any) => <p className="mb-4" {...props} />,
    code: (props: any) => (
        <code className="rounded bg-gray-100 px-1 py-0.5" {...props} />
    ),
    pre: (props: any) => (
        <pre
            className="mb-4 overflow-auto rounded bg-gray-100 p-4"
            {...props}
        />
    ),
    div: (props: any) => <div {...props} />,
};

export default function MarkdownViewer({ process }: MarkdownViewerProps) {
    const { file, windowId } = process;
    const [MDXContent, setMDXContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const compileMDX = async () => {
            try {
                setLoading(true);
                setError(null);

                const { default: Content } = await evaluate(file.content, {
                    ...runtime,
                    useMDXComponents: () => components,
                });

                setMDXContent(() => Content);
            } catch (err: any) {
                console.error('MDX compilation error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        compileMDX();
    }, [file.content]);

    return (
        <Window windowId={windowId} title={process.file.name}>
            <div className="p-4">
                <MDXProvider components={components}>
                    {loading && <div>Loading...</div>}
                    {error && (
                        <div className="text-red-500">Error: {error}</div>
                    )}
                    {MDXContent && <MDXContent />}
                </MDXProvider>
            </div>
        </Window>
    );
}
