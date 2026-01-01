const { clearTimeout, setTimeout } = globalThis;

export default seconds => {
    let cancel = () => { };

    console.log(clearTimeout, setTimeout);
    const promise = new Promise(resolve => {
        const timeoutId = setTimeout(resolve, seconds * 1000);
        cancel = () => {
            clearTimeout(timeoutId);
            resolve(undefined);
        };
    });
    return { cancel, promise };
};
