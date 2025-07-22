import { cn } from '@/utils/cn';

import WindowControls from './WindowControls';

interface WindowTitleBarProps {
    title: string;
    className: string;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onDragStart?: (e: React.MouseEvent) => void;
}

export default function WindowTitleBar({
    title,
    className,
    onClose,
    onMinimize,
    onMaximize,
    onDragStart,
}: WindowTitleBarProps) {
    return (
        <div
            className={cn(
                'h-8 bg-gray-700/20 rounded-t-lg',
                'flex items-center justify-between px-3',
                'select-none cursor-move',
                'border-b border-white/10',
                className,
            )}
            onMouseDown={onDragStart}
        >
            {/* 왼쪽: 컨트롤 버튼 */}
            <div className="cursor-default">
                <WindowControls
                    onClose={onClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    showIcons={true}
                />
            </div>

            {/* 중앙: 제목 */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <span className="text-sm font-medium text-white">{title}</span>
            </div>
        </div>
    );
}
