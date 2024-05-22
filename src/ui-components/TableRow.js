import { GameTable } from "./table/GameTable.js";
import React, { useState } from 'react';
import ScrollableContainer from "./table/ScrollableContainer.js";
import { Game } from "../score-logic";

export default function TableRow({game}) {    
    const [showRow, setShowRow] = useState(true);

    const bowlingInfo = {
        ...game, currScore: Game.currScore(game)
    };

    const hideRow = () => {
        setShowRow(!showRow);
    };

    return (
        <div className="table-row">
            <div className="row-header" onClick={hideRow}>
                <h2>{game?.name}{showRow ? '   ▼' : '   ▶'}</h2>
            </div>
            <div hidden={!showRow || !game}>
            <button>Set Handicap</button>
                <ScrollableContainer>
                    <GameTable {...bowlingInfo}/>
                </ScrollableContainer>
            </div>
        </div>
    );
}