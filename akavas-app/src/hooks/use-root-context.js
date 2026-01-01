import { createContext, useContext } from 'react';

const RootContext = createContext(undefined);

// todo: export RootContext alongside the hook, or remove this file if it's not yet needed
export default () => useContext(RootContext);
