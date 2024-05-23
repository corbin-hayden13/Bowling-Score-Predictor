import { GameTable } from "./table/GameTable.js";
import React, { useState } from 'react';
import ScrollableContainer from "./table/ScrollableContainer.js";
import { Game } from "../score-logic";
import { useGlobals } from "../Globals.js";

export default function TableRow({game}) {    
    const [showRow, setShowRow] = useState(true);
    const { selectedFrameInd } = useGlobals();

    const bowlingInfo = {
        ...game, currScore: Game.currScore(game)
    };

    const hideRow = () => {
        setShowRow(!showRow);
    };

    console.log(game.framesOneToNine);

    return (
        <div className="table-row">
            <div className="row-header" onClick={hideRow}>
                <h2>{game.name}{showRow ? '   ▼' : '   ▶'}</h2>
            </div>
            <div hidden={!showRow || !game}>
                <button>Set Handicap</button>
                <div> {
                    Game.getValidNumberPins(game, selectedFrameInd + 1, 1).map((pinNum, _) => {
                        return <button>{pinNum}</button>;
                    })
                } </div>
                <ScrollableContainer>
                    <GameTable {...bowlingInfo}/>
                </ScrollableContainer>
            </div>
        </div>
    );
}