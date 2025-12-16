import { createContext, useContext } from 'react';

const RootContext = createContext();

export default () => useContext(RootContext);
