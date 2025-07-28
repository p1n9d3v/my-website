'use client';

import { Circle, MoreHorizontal, Search } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';

import { cn } from '@/utils/cn';

export default function MenuBar() {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useLayoutEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString('ko-KR', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            );
            setCurrentDate(
                now.toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                }),
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSpotlightClick = () => {
        console.log('Spotlight 검색 열기');
    };

    const handleAppleMenuClick = () => {
        console.log('Apple 메뉴 열기');
    };

    const buttonStyles = cn(
        'px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer',
        'text-white/80 hover:text-white hover:bg-white/10',
    );

    const menuItems = [
        { label: '파일', onClick: () => console.log('파일 메뉴') },
        { label: '편집', onClick: () => console.log('편집 메뉴') },
        { label: '보기', onClick: () => console.log('보기 메뉴') },
        { label: '이동', onClick: () => console.log('이동 메뉴') },
    ];

    return (
        <div
            className={cn(
                'fixed top-0 right-0 left-0 z-50 h-10',
                'border-b border-white/10 bg-black/20 backdrop-blur-md',
            )}
        >
            <div className="flex h-full items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleAppleMenuClick}
                        className={cn(buttonStyles, 'px-2')}
                        aria-label="Apple 메뉴"
                    >
                        <Circle className="h-3 w-3 fill-current" />
                    </button>

                    <span className="text-sm font-medium">P1n9</span>

                    <nav className="flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className={buttonStyles}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-x-3">
                    <div
                        className={cn(
                            'flex items-center gap-2',
                            'text-right text-sm font-medium',
                        )}
                    >
                        <div>{currentTime}</div>
                        <div className="text-xs">{currentDate}</div>
                    </div>

                    <button
                        onClick={handleSpotlightClick}
                        className={buttonStyles}
                        title="Spotlight 검색 (⌘Space)"
                        aria-label="검색"
                    >
                        <Search className="h-4 w-4" />
                    </button>

                    <button
                        className={buttonStyles}
                        title="제어"
                        aria-label="제어"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
