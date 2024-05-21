import { GameTable } from "./table/GameTable.js";
import React, { useState } from 'react';
import { useGlobals } from "../Globals.js";
import ScrollableContainer from "./table/ScrollableContainer.js";

export default function TableRow({index}) {
    const { games, selectedFrameInd, updateSelectedFrameInd, updateSelectedGameInd } = useGlobals();
    const [showRow, setShowRow] = useState(true);

    const gameTableInfo = {
        playerInd: index,
        bowlingInfo: games[index]?.bundle(),
        uiInfo: {selectedFrameInd, updateSelectedFrameInd, updateSelectedGameInd}
    };

    const hideRow = () => {
        setShowRow(!showRow);
    };

    console.log(games[index]);

    return (
        <div className="table-row">
            <div className="row-header" onClick={hideRow}>
                <h2>{games[index]?.name}</h2>
                <span>{showRow ? '▼' : '▶'}</span>
            </div>
            {showRow && games[index] &&
                <ScrollableContainer>
                    <GameTable {...gameTableInfo}/>
                </ScrollableContainer>
            }
        </div>
    );
}