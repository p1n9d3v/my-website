// public/vanta-worker.js
let waveEffect = null;
let isInitialized = false;

// VANTA 라이브러리 URLs
const libs = [
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
    'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js',
];

const vantaConfig = {
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x23153c,
    shininess: 30,
    waveHeight: 15,
    waveSpeed: 1,
    zoom: 1,
};

globalThis.addEventListener('message', async ({ data }) => {
    try {
        if (data.type === 'init') {
            // 라이브러리 로드
            if (!isInitialized) {
                await loadLibraries();
                isInitialized = true;
                postMessage({ type: 'init-complete' });
            }
        } else if (data.type === 'create') {
            // OffscreenCanvas로 VANTA 효과 생성
            const { canvas, width, height, devicePixelRatio, config } = data;

            if (!globalThis.VANTA) {
                postMessage({ type: 'error', message: 'VANTA not loaded' });
                return;
            }

            // 기존 효과 정리
            if (waveEffect) {
                waveEffect.destroy();
                waveEffect = null;
            }

            // 새 VANTA 효과 생성
            waveEffect = globalThis.VANTA.WAVES({
                ...vantaConfig,
                ...config,
                canvas, // OffscreenCanvas
                width,
                height,
                devicePixelRatio: devicePixelRatio || 1,
            });

            postMessage({ type: 'created' });
        } else if (data.type === 'resize') {
            // 리사이즈 처리
            const { width, height } = data;
            if (waveEffect && waveEffect.renderer) {
                waveEffect.renderer.setSize(width, height);
                waveEffect.resize();
            }
        } else if (data.type === 'update-config') {
            // 설정 업데이트
            const { config } = data;
            if (waveEffect && waveEffect.setOptions) {
                waveEffect.setOptions(config);
            }
        } else if (data.type === 'pause') {
            // 애니메이션 일시정지
            if (waveEffect && waveEffect.renderer) {
                waveEffect.renderer.setAnimationLoop(null);
            }
        } else if (data.type === 'resume') {
            // 애니메이션 재개
            if (waveEffect && waveEffect.renderer && waveEffect.onUpdate) {
                waveEffect.renderer.setAnimationLoop(waveEffect.onUpdate);
            }
        } else if (data.type === 'destroy') {
            // 효과 정리
            if (waveEffect) {
                waveEffect.destroy();
                waveEffect = null;
            }
        }
    } catch (error) {
        postMessage({
            type: 'error',
            message: error.message,
            stack: error.stack,
        });
    }
});

async function loadLibraries() {
    for (const lib of libs) {
        try {
            importScripts(lib);
            // 각 라이브러리 로드 후 잠시 대기
            await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
            throw new Error(`Failed to load library: ${lib}`);
        }
    }

    // VANTA가 로드되었는지 확인
    if (!globalThis.VANTA) {
        throw new Error('VANTA library not available');
    }
}

// 에러 핸들링
globalThis.addEventListener('error', (event) => {
    postMessage({
        type: 'error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
    });
});

globalThis.addEventListener('unhandledrejection', (event) => {
    postMessage({
        type: 'error',
        message: event.reason?.message || 'Unhandled promise rejection',
    });
});
