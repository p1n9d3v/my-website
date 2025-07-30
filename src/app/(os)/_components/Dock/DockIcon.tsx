import { useState } from 'react';

import type { Program } from '@/os/_types/file-system';

import { cn } from '@/utils/cn';

interface DockIconProps {
    program: Program;
    isRunning?: boolean;
}

export default function DockIcon({ program, isRunning }: DockIconProps) {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = program.Icon;

    const handleAppClick = (program: Program) => {
        console.log(`${program.name} 앱 실행/포커스`);
    };

    const handleAppRightClick = (e: React.MouseEvent, program: Program) => {
        e.preventDefault();
        console.log(`${program.name} 컨텍스트 메뉴`);
    };

    return (
        <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 툴팁 라벨 */}
            {isHovered && (
                <div
                    className={cn(
                        'absolute -top-10 left-1/2 -translate-x-1/2 transform',
                        'bg-white/40 backdrop-blur-sm',
                        'text-xs font-medium text-white',
                        'rounded-md px-2 py-1',
                        'whitespace-nowrap',
                    )}
                >
                    {program.name}
                </div>
            )}

            {/* 앱 버튼 */}
            <button
                onClick={() => handleAppClick(program)}
                onContextMenu={(e) => handleAppRightClick(e, program)}
                className={cn(
                    'group',
                    'h-14 w-14',
                    'flex items-center justify-center',
                    'rounded-xl transition-all duration-300 ease-out',
                    'cursor-pointer hover:bg-white/90',
                    'hover:-translate-y-2 hover:scale-110 hover:transform',
                    'active:scale-95',
                )}
            >
                <IconComponent
                    className={cn(
                        'h-8 w-8',
                        'text-white drop-shadow-sm transition-all duration-300',
                        'group-hover:text-black/80',
                    )}
                />
            </button>

            {/* 실행 중 표시 점 */}
            {isRunning && (
                <div
                    className={cn(
                        'absolute -bottom-1',
                        'h-1 w-1',
                        'rounded-full bg-white/80',
                    )}
                />
            )}
        </div>
    );
}
