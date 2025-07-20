'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function WallPaper() {
    useEffect(() => {
        const initVanta = () => {
            const cssVariables = getComputedStyle(document.documentElement);
            const backgroundColor =
                cssVariables.getPropertyValue('--bg-primary');
            const color = cssVariables.getPropertyValue('--text-primary');

            if (typeof window !== 'undefined' && (window as any).VANTA) {
                (window as any).VANTA.NET({
                    el: '#wallpaper',
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: color,
                    backgroundColor,
                });
            }
        };
        initVanta();
    }, []);

    return (
        <>
            <div id="wallpaper" className="fixed inset-0 -z-50"></div>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
                strategy="beforeInteractive"
            />
        </>
    );
}
