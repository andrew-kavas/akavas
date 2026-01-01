import sleep from '#src/functions/sleep.js';

/**
 * @template {unknown} T
 * @param {() => T} fn
 * @param {{
 *   maxAttempts?: number;
 *   shouldRetry?: (error: Error) => boolean;
 *   wait?: number;
 * }} p1
 */
export default async (
    fn,
    { maxAttempts = 5, shouldRetry = () => true, wait = 0.5 } = {}
) => {
    let attempts = 0;
    while (true) {
        try {
            return await fn();
        } catch (er) {
            if (attempts + 1 >= maxAttempts || !shouldRetry(er)) throw er;

            await sleep(wait * 2 ** attempts++).promise;
        }
    }
};
