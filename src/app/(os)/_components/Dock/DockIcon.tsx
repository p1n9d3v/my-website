import { useState } from 'react';

import type { Program } from '@/os/_types/file-system';

import { cn } from '@/utils/cn';

interface DockIconProps {
    program: Program;
    processCount?: number;
    onClick?: () => void;
}

export default function DockIcon({
    program,
    processCount,
    onClick,
}: DockIconProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleAppRightClick = (e: React.MouseEvent, program: Program) => {
        e.preventDefault();
        console.log(`${program.name} 컨텍스트 메뉴`);
    };

    return (
        <div
            className={cn(
                'group',
                'relative flex flex-col items-center',
                'rounded-xl transition-all duration-300 ease-out',
                'cursor-pointer hover:bg-white/90',
                'hover:-translate-y-4 hover:scale-110 hover:transform',
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 툴팁 라벨 */}
            {isHovered && (
                <div
                    className={cn(
                        'absolute -top-8 left-1/2 -translate-x-1/2 transform',
                        'bg-white backdrop-blur-sm',
                        'text-xs font-medium text-black',
                        'rounded-md px-2 py-1',
                        'whitespace-nowrap',
                    )}
                >
                    {program.name}
                </div>
            )}

            {/* 앱 버튼 */}
            <button
                onClick={onClick}
                onContextMenu={(e) => handleAppRightClick(e, program)}
                className={cn('h-14 w-14', 'flex items-center justify-center')}
            >
                <program.Icon
                    size={38}
                    className={cn('text-white', 'group-hover:text-black/80')}
                />
            </button>

            {processCount && (
                <div className="absolute bottom-0.5 flex gap-1">
                    {Array.from({
                        length: processCount > 5 ? 5 : processCount,
                    }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                'h-1 w-1',
                                'rounded-full bg-white/60',
                                'group-hover:-translate-y-1 group-hover:bg-black/60',
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
