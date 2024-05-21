let validNumPins = [...Array(11).keys()];  // [0 ... 10]
validNumPins = validNumPins.reverse();

const maxFrame = 10;

function create2DArray(numCols, numRows) {
    // Default values are `undefined`
    return [...Array(numRows)].map(_ => Array(numCols));
}

function nullToZeroCheck(value) {
    return value ? value : 0;
}

function makePotentialGame(currOneToNine, currTen) {
    let perfectGameOneToNine = create2DArray(2, 9);
    let perfectGameTen = [10, 10, 10];

    for (let a = 0; a < perfectGameOneToNine.length; a++) {
        if (currOneToNine[a][0] !== undefined) { // If frame has been scored i.e. not null
            perfectGameOneToNine[a] = currOneToNine[a];
        }
        else {
            perfectGameOneToNine[a] = [10, 0];
        }
    }

    if (currTen[0]) { // If frame has been scored i.e. not null
        perfectGameTen = currTen;
    }

    return {
        oneToNine: perfectGameOneToNine,
        ten: perfectGameTen
    };
    
}

function sum(vals) {
    return vals.reduce((accumulator, currVal) => accumulator + currVal, 0);
}

function posSum(vals) {
    return vals.reduce((accumulator, currVal) => {
        if (!currVal || currVal <= -1) {
            return accumulator;
        }
        else {
            return accumulator + currVal;
        }
    }, 0);
}

function validNumPinsfromThrow(frameNum, throwNum, frameScores) {
    switch (throwNum) {
        case 1:
            return validNumPins;
            
        case 2:
            /** Need to account for 12th frame if first throw == 10 but second throw < 10 */
            if (frameNum === 10 && frameScores[0] === 10) {
                return validNumPins;
            }
            else {
                console.log(`Should execute here, frameNum = ${frameNum}, throwNum = ${throwNum}, framesScores = ${frameScores}`);
                const score = frameScores[0];
                return validNumPins.slice(score);
            }

        case 3:
            if (frameScores[1] === 10) {
                return validNumPins;
            }
            else {
                const score = frameScores[1];
                return validNumPins.slice(score - 1);
            }

        default:
            return [];
    }
}

export class Game {
    /**
     * Frames hold values -1, 0 <-> 10 (indicating no score, gutter to spare/strike)
     * Frames start off as null, so any value not null indicates the frame has been scored
     * Score strikes as [10, 0], score incomplete frames as [#, -1]
     */
    constructor () {
        this.framesOneToNine = create2DArray(2, 9);
        this.frameTen = Array(3);
    }

    setFrame(frameNumber, newScores) {
        if (newScores.length === 2 && frameNumber <= maxFrame) { // Frames 1 -> 9
            if (newScores[0] <= -1 && newScores[1] > -1) {
                console.error(`Game.setFrame > newScores = ${newScores}; Cannot have a -1 as first throw`);
                return;
            }
            if (posSum(newScores.slice(0, 2)) > 10) {
                console.error(`Game.setFrame > newScores = ${newScores}; Sum of new scores is > 10`);
                return;
            }
            if (newScores[0] === 10) {
                this.framesOneToNine[frameNumber - 1] = [10, 0];
                return;
            }
            this.framesOneToNine[frameNumber -1] = newScores;
        }
        else if (newScores.length === 3 && frameNumber === 10) { // 10th frame
            if (posSum(newScores) > 30) {
                console.error(`Game.setFrame > newScores = ${newScores}; Sum of new scores is > 30`);
                return;
            }
            if ((newScores[0] <= -1 && (newScores[1] > -1 || newScores[2] > -1)) || (newScores[1] <= -1 && newScores[2] > -1)) {
                console.error(`Game.setFrame > newScores = ${newScores}; Cannot have a -1 as first or second throw`);
                return;
            }
            this.frameTen = newScores;
        }
    }
    getFrame(frameNumber) {
        // For debugging purposes
        if (frameNumber <= maxFrame - 1) {
            return this.framesOneToNine[frameNumber];
        }
        else {
            return this.frameTen[frameNumber];
        }
    }
    getValidNumberPins(frameNumber, throwNumber) {
        // throwNumber is 1, 2, or 3
        if (frameNumber <= maxFrame - 1) {
            return validNumPinsfromThrow(frameNumber, throwNumber, this.framesOneToNine[frameNumber - 1]);
        }
        else { // Frame 12
            return validNumPinsfromThrow(frameNumber, throwNumber, this.frameTen);
        }
    }
    currScore() {
        let score = 0;
        let stillScoring = true;
        for (let a = 0; a < this.framesOneToNine.length; a++) {
            console.log(`currScore>a = ${a}`);
            if (!this.framesOneToNine[a][0]) {
                stillScoring = false;
                break;
            }

            const temp = posSum(this.framesOneToNine[a]);
            if (temp === 10) {
                if (nullToZeroCheck(this.framesOneToNine[a][0]) === 10) { // Strike
                    score += 10;
                    if (a + 1 === maxFrame - 2) { // Strike in 8th frame may require tenth frame
                        if (posSum(this.framesOneToNine[a + 1]) < 10) {
                            score += posSum(this.framesOneToNine[a + 1]);
                        }
                        else {
                            score += nullToZeroCheck(this.framesOneToNine[a + 1][0]);
                            score += nullToZeroCheck(this.frameTen[0]);
                        }
                    }
                    else if (a + 1 === maxFrame - 1) { // Strike in 9th frame requires tenth frame
                        score += posSum(this.frameTen.slice(0, 2));
                    }
                    else {
                        if (posSum(this.framesOneToNine[a + 1]) < 10) {
                            score += posSum(this.framesOneToNine[a + 1]);
                        }
                        else {
                            score += nullToZeroCheck(this.framesOneToNine[a + 1][0]);
                            score += nullToZeroCheck(this.framesOneToNine[a + 2][0]);
                        }
                    }
                }
                else { // Spare
                    score += 10;
                    if (a + 1 === maxFrame - 1) {
                        score += nullToZeroCheck(this.frameTen[0]);
                    }
                    else {
                        score += nullToZeroCheck(this.framesOneToNine[a + 1][0]);
                    }
                }
            }
            else {
                score += temp;
            }
        }

        if (stillScoring && !this.frameTen[0]) {
            return score + posSum(this.frameTen)
        }
        else {
            return score;
        }
    }
    maxScore() {
        let score = 0;
        const { oneToNine, ten } = makePotentialGame(this.framesOneToNine, this.frameTen);
        console.log(`maxScore>oneToNine = ${oneToNine}`);
        for (let a = 0; a < oneToNine.length; a++) {
            const temp = posSum(oneToNine[a]);
            if (temp === 10) {
                if (nullToZeroCheck(oneToNine[a][0]) === 10) { // Strike
                    score += 10;
                    if (a + 1 === maxFrame - 2) { // Strike in 8th frame may require tenth frame
                        if (posSum(oneToNine[a + 1]) < 10) {
                            score += posSum(oneToNine[a + 1]);
                        }
                        else {
                            score += nullToZeroCheck(oneToNine[a + 1][0]);
                            score += nullToZeroCheck(ten[0]);
                        }
                    }
                    else if (a + 1 === maxFrame - 1) { // Strike in 9th frame requires tenth frame
                        score += posSum(ten.slice(0, 2));
                    }
                    else {
                        if (posSum(oneToNine[a + 1]) < 10) {
                            score += posSum(oneToNine[a + 1]);
                        }
                        else {
                            score += nullToZeroCheck(oneToNine[a + 1][0]);
                            score += nullToZeroCheck(oneToNine[a + 2][0]);
                        }
                    }
                }
                else { // Spare
                    score += 10;
                    if (a + 1 === maxFrame - 1) {
                        score += nullToZeroCheck(ten[0]);
                    }
                    else {
                        score += nullToZeroCheck(oneToNine[a + 1][0]);
                    }
                }
            }
            else {
                score += temp;
            }
        }

        return score + posSum(ten);
    }
    bundle() {
        return {
            framesOneToNine: this.framesOneToNine,
            frameTen: this.frameTen,
            currScore: this.currScore(),
            maxScore: this.maxScore()
        };
    }

    importGame() {
        // TODO: For importing saved games as an object
    }
    parseGame() {
        // TODO: Potential future function for outputting games in a human-readable format
    }

}