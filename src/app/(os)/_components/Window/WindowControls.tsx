import { ChevronsLeftRight, Minus, X } from 'lucide-react';

import { cn } from '@/utils/cn';

interface WindowControlsProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onRestore?: () => void;
    isMaximized: boolean;
}

export default function WindowControls({
    onClose,
    onMinimize,
    onMaximize,
    onRestore,
    isMaximized,
}: WindowControlsProps) {
    return (
        <div className="group flex items-center gap-2">
            {/* 닫기 버튼 */}
            <button
                onClick={onClose}
                className={cn(
                    'h-3 w-3 rounded-full bg-red-500',
                    'transition-colors hover:bg-red-600',
                    'flex items-center justify-center',
                )}
                title="닫기"
            >
                <X
                    size={10}
                    className="text-black opacity-0 transition-opacity group-hover:opacity-100"
                    strokeWidth={3}
                />
            </button>

            {/* 최소화 버튼 */}
            <button
                onClick={onMinimize}
                className={cn(
                    'h-3 w-3 rounded-full bg-yellow-500',
                    'transition-colors hover:bg-yellow-600',
                    'flex items-center justify-center',
                )}
                title="최소화"
            >
                <Minus
                    size={10}
                    className="text-black opacity-0 transition-opacity group-hover:opacity-100"
                    strokeWidth={3}
                />
            </button>

            {/* 최대화/최소화 버튼 */}
            <button
                onClick={isMaximized ? onRestore : onMaximize}
                className={cn(
                    'h-3 w-3 rounded-full bg-green-500',
                    'transition-colors hover:bg-green-600',
                    'flex items-center justify-center',
                )}
                title="최대화"
            >
                <ChevronsLeftRight
                    size={10}
                    className="rotate-45 text-black opacity-0 transition-opacity group-hover:opacity-100"
                    strokeWidth={3}
                />
            </button>
        </div>
    );
}
