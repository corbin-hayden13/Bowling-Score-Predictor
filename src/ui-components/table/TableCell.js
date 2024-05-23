import "./Bowling-Table.css";
import { useGlobals } from "../../Globals.js";

export function TableCell({bundle}) {
    const { selectedFrameInd, updateSelectedFrameInd, selectedGameInd, updateSelectedGameInd, gameIndByUUID } = useGlobals();
    const { gameUUID, frameNum, scores, currScore } = bundle;
    const selectedColor = "rgb(167, 255, 255)";
    const isSelected = (frameNum - 1 === selectedFrameInd) && (selectedGameInd === gameIndByUUID(gameUUID));

    const clickFunc = () => {
        updateSelectedFrameInd(frameNum - 1);
        updateSelectedGameInd(gameIndByUUID(gameUUID));
    };

    const firstThrow = scores[0] !== undefined && scores[0] >= 0 && scores[0] !== null ? `${scores[0]}` : " ";
    const secondThrow = scores[1] !== undefined && scores[1] >= 0 ? `${scores[1]}` : " ";
    const thirdThrow = (frameNum === 10) && scores[2] !== undefined && scores[2] >= 0 ? `${scores[2]}` : " ";

    const doubleCell = (
        <div className={`table-cell`} style={{backgroundColor: `${isSelected ? selectedColor : ""}`}} onClick={clickFunc}>
            <div className="top-left">{firstThrow}</div>
            <div className="top-right">{secondThrow}</div>
            <div className="bottom-double">{currScore}</div>
        </div>
    );

    const tripleCell = (
        <div className={`tenth-frame-container`} style={{backgroundColor: `${isSelected ? selectedColor : ""}`}} onClick={clickFunc}>
            <div className="top-left">{firstThrow}</div>
            <div className="top-right">{secondThrow}</div>
            <div className="top-right">{thirdThrow}</div>
            <div className="bottom-triple">{currScore}</div>
        </div>
    );

    if (frameNum !== 10) return doubleCell;
    else return tripleCell;
}