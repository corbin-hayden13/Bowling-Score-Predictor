import React, { createContext, useContext, useState } from 'react';

const GlobalsContext = createContext();

export function useGlobals() {
    return useContext(GlobalsContext);
}

export function GlobalsProvider({children}) {
    const [selectedPlayerInd, setSelectedPlayerInd] = useState(0);
    const updateSelectedPlayerInd = (updates) => {
        setSelectedPlayerInd(prev => ({...prev, ...updates}));
    };

    const returnVals = {
        selectedPlayerInd, updateSelectedPlayerInd
    };

    return (
        <GlobalsContext.Provider value={{...returnVals}}>
            {children}
        </GlobalsContext.Provider>
    );
}