import Image from 'next/image';
import { useState } from 'react';

import type { File } from '@/os/_data/file-system';

import { cn } from '@/utils/cn';

interface DockIconProps {
    file: File;
    processCount?: number;
    onClick?: () => void;
}

export default function DockIcon({
    file,
    processCount,
    onClick,
}: DockIconProps) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            className={cn(
                'group',
                'relative flex flex-col items-center',
                'rounded-xl transition-all duration-300 ease-out',
                'cursor-pointer',
                'hover:-translate-y-4 hover:scale-110 hover:transform',
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {isHovered && (
                <div
                    className={cn(
                        'absolute -top-8 left-1/2 -translate-x-1/2 transform',
                        'backdrop-blur-sm',
                        'text-xs font-medium text-black',
                        'rounded-md px-2 py-1',
                        'whitespace-nowrap',
                    )}
                >
                    {file.name}
                </div>
            )}

            <Image src={file.icon} alt={file.name} width={50} height={50} />

            {processCount && (
                <div className="absolute -bottom-1 flex gap-1">
                    {Array.from({
                        length: processCount > 5 ? 5 : processCount,
                    }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                'h-1 w-1',
                                'rounded-full bg-white/60',
                            )}
                        />
                    ))}
                </div>
            )}
        </button>
    );
}
