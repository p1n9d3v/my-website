import { ChevronsLeftRight, Minus, X } from 'lucide-react';

import { cn } from '@/utils/cn';

interface WindowControlsProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    showIcons?: boolean;
}

export default function WindowControls({
    onClose,
    onMinimize,
    onMaximize,
    showIcons = false,
}: WindowControlsProps) {
    return (
        <div className="flex items-center gap-2 group">
            {/* 닫기 버튼 */}
            <button
                onClick={onClose}
                className={cn(
                    'w-3 h-3 rounded-full bg-red-500',
                    'hover:bg-red-600 transition-colors',
                    'flex items-center justify-center',
                )}
                title="닫기"
            >
                {showIcons && (
                    <X
                        size={10}
                        className="text-black opacity-0 group-hover:opacity-100 transition-opacity"
                        strokeWidth={3}
                    />
                )}
            </button>

            {/* 최소화 버튼 */}
            <button
                onClick={onMinimize}
                className={cn(
                    'w-3 h-3 rounded-full bg-yellow-500',
                    'hover:bg-yellow-600 transition-colors',
                    'flex items-center justify-center',
                )}
                title="최소화"
            >
                {showIcons && (
                    <Minus
                        size={10}
                        className="text-black opacity-0 group-hover:opacity-100 transition-opacity"
                        strokeWidth={3}
                    />
                )}
            </button>

            {/* 최대화 버튼 */}
            <button
                onClick={onMaximize}
                className={cn(
                    'w-3 h-3 rounded-full bg-green-500',
                    'hover:bg-green-600 transition-colors',
                    'flex items-center justify-center',
                )}
                title="최대화"
            >
                {showIcons && (
                    <ChevronsLeftRight
                        size={10}
                        className="text-black opacity-0 group-hover:opacity-100 transition-opacity rotate-45"
                        strokeWidth={3}
                    />
                )}
            </button>
        </div>
    );
}
