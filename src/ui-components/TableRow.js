import { GameTable } from "./table/GameTable.js";
import React, { useState } from 'react';
import { useGlobals } from "../Globals.js";

export default function TableRow({player}) {
    const { updateSelectedPlayerInd } = useGlobals();
    const [showRow, setShowRow] = useState(true);

    const gameTableInfo = {
        playerInd: player.index,
        bowlingInfo: player.game.bundle(),
        uiInfo: {updateSelectedPlayerInd}
    };

    const hideRow = () => {
        setShowRow(!showRow);
    };

    return (
        <div className="table-row">
            <div className="row-header" onClick={hideRow}>
                <h2>{player.name}</h2>
                <span>{!showRow ? '▼' : '▶'}</span>
            </div>
            {showRow && <GameTable {...gameTableInfo}/>}
        </div>
    );
}