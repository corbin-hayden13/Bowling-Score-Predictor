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
    const updateGames = (updates) => {
        setGames(prev => ({...prev, ...updates}));
    };
    /* const addGame = (index=0, name="", handicap=0) => {
        let tempGames = Array.isArray([...games]) ? [...games] : [];
        tempGames.push(new Game(index, name, handicap));
        setGames(tempGames);
        if (games === undefined) {
            console.error(`Error: games is ${games.map((index) => {return games[index].bundle()})}`);
        }
        else {
            console.log(`games is ${games.map((index) => {return games[index].bundle()})}`);
        }
        // setGames((prevGames) => [...prevGames, new Game(index, name, handicap)]);
    }; */
    const addGame = useCallback((index = 0, name = "", handicap = 0) => {
        setGames((prevGames) => {
          const newGames = [...prevGames, {
            index, name, handicap,
            framesOneToNine: Game.makeFramesOneToNine(), frameTen: Game.makeFrameTen()
          }];
          console.log(`newGames = ${newGames}`);
          return newGames;
        });
      }, []);
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