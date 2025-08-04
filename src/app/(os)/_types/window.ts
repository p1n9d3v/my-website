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
    zIndex: number;
    isHide: boolean;
}
