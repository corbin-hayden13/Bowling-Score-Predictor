import { TableCell } from "./TableCell.js";
import "./Bowling-Table.css";

export function GameTable({playerInd, bowlingInfo, uiInfo}) {
    const {framesOneToNine, frameTen, currScore, maxScore} = bowlingInfo;
    const {selectedFrameInd, setSelectedFrameInd, updateSelectedPlayerInd} = uiInfo;

    const handleOnClick = (index) => {
        setSelectedFrameInd(index);
        updateSelectedPlayerInd(playerInd);
    };

    return (
        <table className="bowling-table">
            <thead>
                <tr>
                    <th>Frame 1</th>
                    <th>Frame 2</th>
                    <th>Frame 3</th>
                    <th>Frame 4</th>
                    <th>Frame 5</th>
                    <th>Frame 6</th>
                    <th>Frame 7</th>
                    <th>Frame 8</th>
                    <th>Frame 9</th>
                    <th>Frame 10</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {framesOneToNine.map((frame, index) => {
                        <td key={index}>
                            <TableCell bundle={{
                                frameNum: index + 1,
                                scores: frame,
                                currScore, maxScore,
                                isSelected: selectedFrameInd === index,
                                clickFunc: handleOnClick
                            }} />
                        </td>
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