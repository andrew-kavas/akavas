import utf8 from 'utf8';

const { atob } = globalThis;

const decode = str => {
    try {
        return JSON.parse(
            utf8.decode(atob(str.replace(/-/g, '+').replace(/_/g, '/')))
        );
    } catch {
        return null;
    }
};

export default str => {
    const obj = {};
    new URLSearchParams(str).forEach((v, k) => {
        obj[k] = k.endsWith('B64') ? decode(v) : v;
    });
    return obj;
};
