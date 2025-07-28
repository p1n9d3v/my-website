import type { Position, Size } from '@/os/_types';

import Window from '@/os/_components/Window';

import { useOSStore } from '../../_store';

interface BlogProps {
    appId: string;
}

export default function Blog({ appId }: BlogProps) {
    const context = useOSStore((state) => state.appContexts[appId]);
    const { updateWindowRect, hideApp, terminateApp } = useOSStore();

    const handleHideWindow = () => {
        hideApp(appId);
    };

    const handleTerminateWindow = () => {
        terminateApp(appId);
    };

    const handleUpdateWindowRect = (rect: {
        position?: Position;
        size?: Size;
    }) => {
        updateWindowRect(appId, rect);
    };

    return (
        <Window
            window={context.window}
            onHide={handleHideWindow}
            onClose={handleTerminateWindow}
            onUpdateRect={handleUpdateWindowRect}
            renderHeaderContent={
                <div className="absolute top-0 left-1/2 -translate-x-1/2 transform">
                    <p className="text-xl dark:text-green-500">
                        {context.name}
                    </p>
                </div>
            }
        >
            <p className="text-xl dark:text-green-500">Funcking</p>
        </Window>
    );
}
