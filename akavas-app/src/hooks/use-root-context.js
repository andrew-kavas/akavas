import { createContext, useContext } from 'react';

const RootContext = createContext(undefined);

export default () => useContext(RootContext);
