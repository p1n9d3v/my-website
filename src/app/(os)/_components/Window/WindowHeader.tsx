import type { ReactNode } from 'react';

import { Minus, X, Minimize2, Maximize2 } from 'lucide-react';

import { cn } from '@/utils/cn';

interface WindowHeaderProps {
    className: string;
    isMaximized: boolean;
    onClose?: () => void;
    onMaximize?: () => void;
    onRestore?: () => void;
    onHide?: () => void;
    renderContent?: ReactNode;
}

export default function WindowHeader({
    className,
    isMaximized,
    renderContent,
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
            {/*DESC: 왼쪽: 컨트롤 버튼 */}
            <div className="cursor-default">
                <div className="group flex items-center gap-2">
                    {/*DESC: 닫기 버튼 */}
                    <button
                        onClick={onClose}
                        onMouseDown={(event) => event.stopPropagation()}
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

                    {/*DESC: 숨김(최소화) 버튼 */}
                    <button
                        onClick={onHide}
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

                    {/*DESC: 최대화/복구 버튼 */}
                    <button
                        onClick={isMaximized ? onRestore : onMaximize}
                        className={cn(
                            'h-3 w-3 rounded-full bg-green-500',
                            'transition-colors hover:bg-green-600',
                            'flex items-center justify-center',
                        )}
                        title={isMaximized ? '최소화' : '최대화'}
                    >
                        {isMaximized ? (
                            <Minimize2
                                size={10}
                                className="text-black opacity-0 transition-opacity group-hover:opacity-100"
                                strokeWidth={3}
                            />
                        ) : (
                            <Maximize2
                                size={10}
                                className="text-black opacity-0 transition-opacity group-hover:opacity-100"
                                strokeWidth={3}
                            />
                        )}
                    </button>
                </div>
            </div>

            {/*DESC: 중앙: 컨텐츠 */}
            <div className="flex-1">{renderContent}</div>
        </div>
    );
}
