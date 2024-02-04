export const setAsyncTimeout = (timeout: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};
