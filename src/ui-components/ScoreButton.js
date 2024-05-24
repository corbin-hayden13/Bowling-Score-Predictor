import { useGlobals } from "../Globals.js";

export function ScoreButton({bowlingInfo, buttonNum}) {
    const { setFrame, selectedFrameInd, currThrowNum } = useGlobals();

    const handleOnClick = () => {
        let tempScore;
        if (selectedFrameInd <= 9 - 1) tempScore = [...bowlingInfo.framesOneToNine[currThrowNum - 1]];
        else tempScore = [...bowlingInfo.frameTen];

        tempScore[currThrowNum - 1] = buttonNum;

        console.log(`Setting frame ${selectedFrameInd + 1} to ${tempScore}`);

        setFrame(bowlingInfo.gameUUID, selectedFrameInd + 1, tempScore);
    };

    return (
        <button onClick={handleOnClick}>
            {buttonNum}
        </button>
    );
}