import { GameTable } from "./table/GameTable.js";
import React, { useEffect, useState } from 'react';
import { useGlobals } from "../Globals.js";
import ScrollableContainer from "./table/ScrollableContainer.js";

export default function TableRow({index}) {
    const { games, addGame, setFrame, selectedFrameInd, updateSelectedFrameInd, updateSelectedGameInd } = useGlobals();
    const [showRow, setShowRow] = useState(true);

    const gameTableInfo = {
        playerInd: index,
        bowlingInfo: games[index].bundle(),
        uiInfo: {selectedFrameInd, updateSelectedFrameInd, updateSelectedGameInd}
    };

    const hideRow = () => {
        setShowRow(!showRow);
    };

    return (
        <div className="table-row">
            <div className="row-header" onClick={hideRow}>
                <h2>{games[index].name}</h2>
                <span>{showRow ? '▼' : '▶'}</span>
            </div>
            {showRow && 
                <ScrollableContainer>
                    <GameTable {...gameTableInfo}/>
                </ScrollableContainer>
            }
        </div>
    );
}