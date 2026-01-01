import attempt from '#src/functions/attempt.js';
import config from '#src/config.js';

const { fetch } = globalThis;
const { version } = config;

const getNewerVersion = async () =>
(getNewerVersion.fetched ??= await attempt(async () => {
    // todo: implement health check for my needs
    // const res = await fetch('/healthz');
    // const { version: currentVersion } = await res.json();
    // if (version !== currentVersion) return currentVersion;
    // return version;
    return version ?? 'static'
}));

export default getNewerVersion;
