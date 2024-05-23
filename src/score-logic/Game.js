import { v4 as uuidv4 } from "uuid";

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
        if (currOneToNine[a][0] !== undefined && currOneToNine[a] !== -1) { // If frame has been scored i.e. not null
            perfectGameOneToNine[a][0] = currOneToNine[a][0];
            if (currOneToNine[a][1] === -1) {
                perfectGameOneToNine[a][1] = 10 - currOneToNine[a][0];
            }
            else {
                perfectGameOneToNine[a][1] = currOneToNine[a][1];
            }
        }
        else {
            perfectGameOneToNine[a] = [10, 0];
        }
    }

    for (let a = 0; a < currTen.length; a++) {
        if (currTen[a] !== undefined && currTen[a] !== -1) {
            perfectGameTen[a] = currTen[a];
        }
    }

    return {
        oneToNine: perfectGameOneToNine,
        ten: perfectGameTen
    };
    
}

export function posSum(vals) {
    return vals.reduce((accumulator, currVal) => {
        if (currVal === undefined || currVal <= -1) {
            return accumulator;
        }
        else {
            return accumulator + currVal;
        }
    }, 0);
}

function validNumPinsfromThrow(frameNum, throwNum, frameScores) {
    console.log(`frameNum ${frameNum}, throwNum ${throwNum}, frameScores ${frameScores}`);
    switch (throwNum) {
        case 1:
            return validNumPins.reverse();
            
        case 2:
            /** Need to account for 12th frame if first throw == 10 but second throw < 10 */
            if (frameNum === 10 && frameScores[0] === 10) {
                return validNumPins.reverse();
            }
            else {
                const score = frameScores[0];
                return validNumPins.slice(score).reverse();
            }

        case 3:
            if (frameScores[1] === 10) {
                return validNumPins.reverse();
            }
            else {
                const score = frameScores[1];
                return validNumPins.slice(score - 1).reverse();
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

    static makeGame(name="", handicap=0) {
        return {
            gameUUID: uuidv4(),
            name, handicap,
            framesOneToNine: Game.makeFramesOneToNine(),
            frameTen: Game.makeFrameTen()
        };
    }
    static makeFramesOneToNine() { return create2DArray(2, 9); }
    static makeFrameTen() { return Array(3); }

    static setFrame(game, frameNumber, newScores) {
        if (frameNumber < 1 || frameNumber > 10) {
            console.error(`game.setFrame > frameNumber = ${frameNumber}; Must set frames between [1, 10]`);
            return game;
        }
        if (newScores.length === 2 && frameNumber <= maxFrame) { // Frames 1 -> 9
            if (newScores[0] <= -1 && newScores[1] > -1) {
                console.error(`Game.setFrame > newScores = ${newScores}; Cannot have a -1 as first throw`);
                return game;
            }
            if (posSum(newScores.slice(0, 2)) > 10) {
                console.error(`Game.setFrame > newScores = ${newScores}; Sum of new scores is > 10`);
                return game;
            }
            if (newScores[0] === 10) {
                game.framesOneToNine[frameNumber - 1] = [10, 0];
            }
            else {
                game.framesOneToNine[frameNumber -1] = newScores;
            }
        }
        else if (newScores.length === 3 && frameNumber === 10) { // 10th frame
            if (posSum(newScores) > 30) {
                console.error(`Game.setFrame > newScores = ${newScores}; Sum of new scores is > 30`);
                return game;
            }
            if ((newScores[0] <= -1 && (newScores[1] > -1 || newScores[2] > -1)) || (newScores[1] <= -1 && newScores[2] > -1)) {
                console.error(`Game.setFrame > newScores = ${newScores}; Cannot have a -1 as first or second throw`);
                return game;
            }
            game.frameTen = newScores;
        }

        return game;
    }
    static getValidNumberPins(game, frameNumber, throwNumber) {
        // throwNumber is 1, 2, or 3
        if (frameNumber <= maxFrame - 1) {
            return validNumPinsfromThrow(frameNumber, throwNumber, game.framesOneToNine[frameNumber - 1]);
        }
        else { // Frame 12
            return validNumPinsfromThrow(frameNumber, throwNumber, game.frameTen);
        }
    }
    static currScore(game) {
        let score = 0;
        let stillScoring = true;
        if (game.framesOneToNine[0][0] === undefined) stillScoring = false;
        for (let a = 0; a < game.framesOneToNine.length && stillScoring; a++) {
            if (game.framesOneToNine[a][0] === undefined) {
                stillScoring = false;
                break;
            }

            const temp = posSum(game.framesOneToNine[a]);
            if (temp === 10) {
                if (nullToZeroCheck(game.framesOneToNine[a][0]) === 10) { // Strike
                    // Frames 8 and 9 - Don't score if no additional throws cover strike requirements
                    if (a + 1 === maxFrame - 2 || a + 1 === maxFrame - 1) {
                        const checkEighth = (a + 1 === maxFrame - 2 && (
                            (
                                game.framesOneToNine[a + 1][0] === undefined || game.framesOneToNine[a + 1][0] === -1 ||
                                game.framesOneToNine[a + 1][1] === undefined || game.framesOneToNine[a + 1][1] === -1
                            ) && (game.frameTen[0] === undefined || game.frameTen[0] === -1 || game.frameTen[1] === undefined || game.frameTen[1] === -1)
                        ));
                        const checkNinth = a + 1 === maxFrame - 1 && (
                            (game.frameTen[0] === undefined || game.frameTen[0] === -1) && (game.frameTen[1] === undefined || game.frameTen[1] === -1)
                        );
                        if (checkEighth || checkNinth) {
                            stillScoring = false;
                            break;
                        }
                    }
                    // This section should only be for frames 1 - 7
                    else if (
                        (
                            game.framesOneToNine[a + 1][0] === undefined || game.framesOneToNine[a + 1][0] === -1 ||
                            game.framesOneToNine[a + 1][1] === undefined || game.framesOneToNine[a + 1][1] === -1
                        ) && (
                            game.framesOneToNine[a + 2][0] === undefined || game.framesOneToNine[a + 2][0] === -1 ||
                            game.framesOneToNine[a + 2][1] === undefined || game.framesOneToNine[a + 2][1] === -1
                        )
                    ) {
                        stillScoring = false;
                        break;
                    }

                    score += 10;
                    if (a + 1 === maxFrame - 2) { // Strike in 8th frame may require tenth frame
                        if (posSum(game.framesOneToNine[a + 1]) < 10) {
                            score += posSum(game.framesOneToNine[a + 1]);
                        }
                        else {
                            score += nullToZeroCheck(game.framesOneToNine[a + 1][0]);
                            score += nullToZeroCheck(game.frameTen[0]);
                        }
                    }
                    else if (a + 1 === maxFrame - 1) { // Strike in 9th frame requires tenth frame
                        score += posSum(game.frameTen.slice(0, 2));
                    }
                    else {
                        if (posSum(game.framesOneToNine[a + 1]) < 10 || (game.framesOneToNine[a + 1][0] < 10 && game.framesOneToNine[a + 1][0] < 10)) {
                            score += posSum(game.framesOneToNine[a + 1]);
                        }
                        else {
                            score += nullToZeroCheck(game.framesOneToNine[a + 1][0]);
                            score += nullToZeroCheck(game.framesOneToNine[a + 2][0]);
                        }
                    }
                }
                else { // Spare
                    if ((a + 1 === maxFrame - 1 && game.frameTen[0] === undefined) || (game.framesOneToNine[a + 1][0] === undefined)) {
                        stillScoring = false;
                        break;
                    }
                    score += 10;
                    if (a + 1 === maxFrame - 1) { // In 9th frame
                        score += nullToZeroCheck(game.frameTen[0]);
                    }
                    else {
                        score += nullToZeroCheck(game.framesOneToNine[a + 1][0]);
                    }
                }
            }
            else {
                score += temp;
            }
        }

        if (stillScoring) {
            // If no strike or spare on first two throws, score the frame and end
            if (game.frameTen[0] !== undefined && posSum(game.frameTen.slice(0, 2)) < 10) {
                return score + posSum(game.frameTen.slice(0, 2));
            }
            else if (game.frameTen[0] !== undefined && posSum(game.frameTen.slice(0, 2)) >= 10) {
                return score + posSum(game.frameTen);
            }
        }
        
        return score;
    }
    static maxScore(game) {
        let score = 0;
        const { oneToNine, ten } = makePotentialGame(game.framesOneToNine, game.frameTen);
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
                        if (posSum(oneToNine[a + 1]) < 10 || (oneToNine[a + 1][0] < 10 && oneToNine[a + 1][0] < 10)) {
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
                    if (a + 1 === maxFrame - 1) { // In 9th frame
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

            console.log(`frame ${oneToNine[a]} score ${score}`);
        }

        // If no strike or spare on first two throws, score the frame and end
        if (posSum(ten.slice(0, 2)) < 10) {
            return score + posSum(ten.slice(0, 2));
        }
        else if (posSum(ten.slice(0, 2)) >= 10) {
            return score + posSum(ten);
        }

        return score + posSum(ten);
    }

    importGame() {
        // TODO: For importing saved games as an object
    }
    parseGame() {
        // TODO: Potential future function for outputting games in a human-readable format
    }

}