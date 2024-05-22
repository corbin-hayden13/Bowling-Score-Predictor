import { TableCell } from "./TableCell.js";
import "./Bowling-Table.css";

export function GameTable({gameUUID, framesOneToNine, frameTen, currScore}) {

    return (
        <table className="bowling-table">
            <tbody>
                <tr>
                    {framesOneToNine.map((frame, index) => {
                        return (
                            <td key={index}>
                                <TableCell bundle={{
                                    gameUUID,
                                    frameNum: index + 1,
                                    scores: frame,
                                    currScore
                                }} />
                            </td>
                        );
                    })}
                    <td key={9}>
                        <TableCell bundle={{
                            gameUUID,
                            frameNum: 10,
                            scores: frameTen,
                            currScore
                        }} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}