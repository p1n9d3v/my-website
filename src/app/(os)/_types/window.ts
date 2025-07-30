export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Window {
    id: string;
    bounds: Bounds;
    processId: string;
    prevBounds: Bounds | null;
    zIndex: number;
    isHide: boolean;
    isMaximized: boolean;
}
