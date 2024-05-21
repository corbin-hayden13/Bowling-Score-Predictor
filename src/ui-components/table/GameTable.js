import { TableCell } from "./TableCell.js";
import "./Bowling-Table.css";

export function GameTable({playerInd, bowlingInfo, uiInfo}) {
    const {framesOneToNine, frameTen, currScore, maxScore} = bowlingInfo;
    const {selectedFrameInd, updateSelectedFrameInd, updateSelectedPlayerInd} = uiInfo;

    const handleOnClick = (index) => {
        updateSelectedFrameInd(index);
        updateSelectedPlayerInd(playerInd);
    };

    return (
        <table className="bowling-table">
            
            <tbody>
                <tr>
                    {framesOneToNine.map((frame, index) => {
                        return (
                            <td key={index}>
                                <TableCell bundle={{
                                    frameNum: index + 1,
                                    scores: frame,
                                    currScore, maxScore,
                                    isSelected: selectedFrameInd === index,
                                    clickFunc: handleOnClick
                                }} />
                            </td>
                        );
                    })}
                    <td key={9}>
                        <TableCell bundle={{
                            frameNum: 10,
                            scores: frameTen,
                            currScore, maxScore,
                            isSelected: selectedFrameInd === 9,
                            clickFunc: handleOnClick
                        }} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}