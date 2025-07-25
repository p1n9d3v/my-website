import { cn } from '@/utils/cn';

import WindowControls from './WindowControls';

interface WindowTitleBarProps {
    title: string;
    className: string;
    isMaximized: boolean;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onRestore?: () => void;
    onDragStart?: (e: React.MouseEvent) => void;
}

export default function WindowTitleBar({
    title,
    className,
    isMaximized,
    onClose,
    onMinimize,
    onRestore,
    onMaximize,
    onDragStart,
}: WindowTitleBarProps) {
    return (
        <div
            className={cn(
                'h-8 rounded-t-lg bg-gray-700/20',
                'flex items-center justify-between px-3',
                'cursor-move select-none',
                'border-b border-white/10',
                className,
            )}
            onMouseDown={onDragStart}
        >
            {/* 왼쪽: 컨트롤 버튼 */}
            <div className="cursor-default">
                <WindowControls
                    isMaximized={isMaximized}
                    onClose={onClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    onRestore={onRestore}
                />
            </div>

            {/* 중앙: 제목 */}
            <div className="absolute left-1/2 -translate-x-1/2 transform">
                <span className="text-sm font-medium text-white">{title}</span>
            </div>
        </div>
    );
}
