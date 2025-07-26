import { cn } from '@/utils/cn';

import WindowControls from './WindowControls';

interface WindowHeaderProps {
    title: string;
    className: string;
    isMaximized: boolean;
    onClose?: () => void;
    onMaximize?: () => void;
    onRestore?: () => void;
    onHide?: () => void;
}

export default function WindowHeader({
    title,
    className,
    isMaximized,
    onClose,
    onRestore,
    onMaximize,
    onHide,
}: WindowHeaderProps) {
    return (
        <div
            className={cn(
                'h-8 rounded-t-lg bg-gray-700/20',
                'flex items-center justify-between px-3',
                'select-none',
                'border-b border-white/10',
                className,
            )}
        >
            {/* 왼쪽: 컨트롤 버튼 */}
            <div className="cursor-default">
                <WindowControls
                    isMaximized={isMaximized}
                    onClose={onClose}
                    onMaximize={onMaximize}
                    onRestore={onRestore}
                    onHide={onHide}
                />
            </div>

            {/* 중앙: 제목 */}
            <div className="absolute left-1/2 -translate-x-1/2 transform">
                <span className="text-sm font-medium text-white">{title}</span>
            </div>
        </div>
    );
}
