import React, { createContext, useContext, useState, useCallback } from 'react';
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

    const [games, setGames] = useState([]);
    const addGame = useCallback((index = 0, name = "", handicap = 0) => {
        setGames((prevGames) => {
            const newGames = prevGames === undefined ? [Game.makeGame(index, name, handicap)] : [...prevGames, Game.makeGame(index, name, handicap)];
            console.log(`newGames = ${JSON.stringify(newGames[-1])}`);
            return newGames;
        });
    }, []);
    const removeGame = useCallback((gameInd) => {
        setGames((prevGames) => {
            let tempGames = [...prevGames];
            tempGames.splice(gameInd, 1);
            return tempGames;
        });
    }, []);
    const setFrame = useCallback((gameInd, frameNum, newScores) => {
        setGames((prevGames) => {
            let tempGames = [...prevGames];
            tempGames[gameInd] = Game.setFrame(tempGames[gameInd], frameNum, newScores);
            return tempGames;
        });
    }, []);

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