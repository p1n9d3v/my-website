'use client';

import { nanoid } from 'nanoid';
import Image from 'next/image';
import { type ComponentProps } from 'react';

import { type File } from '@/os/_types/file-system';

import { useOSStore } from '../_store';

interface LauncherProps extends ComponentProps<'button'> {
    bounds?: string;
    file?: File;
    onDoubleClick?: () => void;
}

export default function Launcher({
    file,
    bounds,
    onDoubleClick,
    ...rest
}: LauncherProps) {
    const { launch } = useOSStore((state) => state.process.actions);

    const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(file));
    };
    const handleDoubleClick = () => {
        launch(file);
    };

    return (
        <button
            onDoubleClick={handleDoubleClick}
            className="flex flex-col items-center"
            {...rest}
        >
            <Image src={file.icon} alt={file.name} width={50} height={50} />
            <p>{file.name}</p>
        </button>
    );
}
