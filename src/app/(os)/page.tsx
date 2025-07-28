'use client';

import { Suspense } from 'react';

import Launcher from '@/os/_components/Launcher';

import { useOSStore } from './_store';

export default function Page() {
    const { apps, runningAppIds } = useOSStore();

    return (
        <>
            {Object.values(apps).map((app) => (
                <Launcher
                    key={app.id}
                    name={app.name}
                    appId={app.id}
                    Icon={app.Icon}
                />
            ))}

            {runningAppIds.map((appId) => {
                const App = apps[appId].Component;
                return (
                    <Suspense key={appId} fallback={null}>
                        <App key={appId} appId={appId} />
                    </Suspense>
                );
            })}
        </>
    );
}
