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

    const [selectedFrameInd, setSelectedFrameInd] = useState(0);
    const updateSelectedFrameInd = (updates) => {
        setSelectedFrameInd(prev => ({...prev, ...updates}));
    };

    const returnVals = {
        selectedPlayerInd, updateSelectedPlayerInd,
        selectedFrameInd, updateSelectedFrameInd
    };

    return (
        <GlobalsContext.Provider value={{...returnVals}}>
            {children}
        </GlobalsContext.Provider>
    );
}