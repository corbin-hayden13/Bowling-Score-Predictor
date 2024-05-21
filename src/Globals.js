import React, { createContext, useContext, useState } from 'react';
import { Game } from './score-logic';

const GlobalsContext = createContext();

export function useGlobals() {
    return useContext(GlobalsContext);
}

export function GlobalsProvider({children}) {
    const [selectedGameInd, setSelectedGameInd] = useState(0);
    const updateSelectedGameInd = (updates) => {
        setSelectedGameInd(prev => ({...prev, ...updates}));
    };

    const [selectedFrameInd, setSelectedFrameInd] = useState(0);
    const updateSelectedFrameInd = (updates) => {
        setSelectedFrameInd(prev => ({...prev, ...updates}));
    };

    const [games, setGames] = useState([new Game()]);
    const updateGames = (updates) => {
        setGames(prev => ({...prev, ...updates}));
    };
    const addGame = (index=0, name="", handicap=0) => {
        let tempGames = [...games];
        tempGames.push(new Game(index, name, handicap));
        updateGames(tempGames);
    };
    const removeGame = (gameInd) => {
        let tempGames = [...games];
        tempGames.splice(gameInd, 1);
        updateGames(tempGames);
    };
    const setFrame = (gameInd, frameNum, newScores) => {
        let tempGames = [...games];
        tempGames[gameInd].setFrame(frameNum, newScores);
        updateGames(tempGames);
    };

    const returnVals = {
        selectedGameInd, updateSelectedGameInd,
        selectedFrameInd, updateSelectedFrameInd,
        games, addGame, removeGame, setFrame
    };

    return (
        <GlobalsContext.Provider value={{...returnVals}}>
            {children}
        </GlobalsContext.Provider>
    );
}