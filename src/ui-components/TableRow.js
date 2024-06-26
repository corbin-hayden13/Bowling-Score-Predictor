import { GameTable } from "./table/GameTable.js";
import React, { useState } from 'react';
import { useGlobals } from "../Globals.js";
import ScrollableContainer from "./table/ScrollableContainer.js";
import { Game } from "../score-logic";

export default function TableRow({index}) {
    const { games, selectedFrameInd, updateSelectedFrameInd, updateSelectedGameInd } = useGlobals();
    
    const [showRow, setShowRow] = useState(true);

    const bowlingInfo = {
        ...games[index],
        currScore: Game.currScore(games[index]),
        maxScore: Game.maxScore(games[index])
    };

    const gameTableInfo = {
        playerInd: index,
        bowlingInfo,
        uiInfo: {selectedFrameInd, updateSelectedFrameInd, updateSelectedGameInd}
    };

    const hideRow = () => {
        setShowRow(!showRow);
    };

    return (
        <div className="table-row">
            <div className="row-header" onClick={hideRow}>
                <h2>{games[index]?.name}{showRow ? '   ▼' : '   ▶'}</h2>
            </div>
            <div hidden={!showRow || !games[index]}>
            <button>Set Handicap</button>
                <ScrollableContainer>
                    <GameTable {...gameTableInfo}/>
                </ScrollableContainer>
            </div>
        </div>
    );
}