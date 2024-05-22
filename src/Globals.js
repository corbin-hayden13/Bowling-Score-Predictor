import React, { createContext, useContext, useState, useCallback } from 'react';
import { Game } from './score-logic';

const GlobalsContext = createContext();

export function useGlobals() {
    return useContext(GlobalsContext);
}

export function GlobalsProvider({children}) {
    const [selectedGameInd, setSelectedGameInd] = useState(-1);
    const updateSelectedGameInd = (updates) => {
        setSelectedGameInd(prev => ({...prev, ...updates}));
    };

    const [selectedFrameInd, setSelectedFrameInd] = useState(-1);
    const updateSelectedFrameInd = (updates) => {
        setSelectedFrameInd(prev => ({...prev, ...updates}));
    };

    const [games, setGames] = useState([]);
    const gameIndByUUID = useCallback((gameUUID) => {
        for (let a = 0; a < games.length; a++) {
            if (games[a].gameUUID === gameUUID) return a;
        }

        return -1;
    }, [games]);
    const addGame = useCallback((name = "", handicap = 0) => {
        setGames((prevGames) => {
            const newGames = prevGames === undefined ? [Game.makeGame(name, handicap)] : [...prevGames, Game.makeGame(name, handicap)];
            return newGames;
        });
    }, []);
    const removeGame = useCallback((gameUUID) => {
        setGames((prevGames) => {
            let tempGames = [...prevGames];
            const gameInd = gameIndByUUID(gameUUID);
            if (gameInd > -1) tempGames.splice(gameIndByUUID(gameUUID), 1);
            
            return tempGames;
        });
    }, [gameIndByUUID]);
    const setFrame = useCallback((gameUUID, frameNum, newScores) => {
        setGames((prevGames) => {
            let tempGames = [...prevGames];
            const gameInd = gameIndByUUID(gameUUID);
            if (gameInd > -1) tempGames[gameInd] = Game.setFrame(tempGames[gameInd], frameNum, newScores);
            return tempGames;
        });
    }, [gameIndByUUID]);

    const returnVals = {
        selectedGameInd, updateSelectedGameInd,
        selectedFrameInd, updateSelectedFrameInd,
        games, addGame, removeGame, setFrame, gameIndByUUID
    };

    return (
        <GlobalsContext.Provider value={{...returnVals}}>
            {children}
        </GlobalsContext.Provider>
    );
}