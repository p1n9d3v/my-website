export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
): ((...args: Parameters<T>) => void) => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (timerId) {
            return;
        }

        timerId = setTimeout(() => {
            func.apply(this, args);
            timerId = null;
        }, delay);
    };
};
