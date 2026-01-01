import attempt from '#src/functions/attempt.js';
import config from '#src/config.js';

const { version } = config;

export let fetchedVersion;

const getNewerVersion = async () =>
(fetchedVersion ??= await attempt(async () => {
    // todo: implement health check for my needs
    // const res = await fetch('/healthz');
    // const { version: currentVersion } = await res.json();
    // if (version !== currentVersion) return currentVersion;
    // return version;
    return version;
}));

export default getNewerVersion;
