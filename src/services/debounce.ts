export const simpleDebounce = <A = unknown, R = void>(
    callback: (args: A) => R,
    interval = 0
): [(args: A) => Promise<R>, () => void] => {
    let timeoutId: number;

    const debouncedFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                resolve(callback(args));
            }, interval);
        });

    const teardown = () => clearTimeout(timeoutId);

    return [debouncedFunc, teardown];
};
export const customThrottle = <A = unknown, R = void>(
    callback: (args: A) => R,
    interval = 0
): [(args: A) => Promise<R>, () => void] => {
    let timeoutId: number | false = false;
    const throttleFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timeoutId === false) {
                timeoutId = setTimeout(() => {
                    timeoutId = false;
                }, interval);
                resolve(callback(args));
            }
        });
    const teardown = () => {
        timeoutId && clearTimeout(timeoutId);
    };
    return [throttleFunc, teardown];
};
