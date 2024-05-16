function create2DArray(numCols, numRows) {
    return [...Array(numCols)].map(_ => Array(numRows));
}

function posSum(vals) {
    return vals.reduce((accumulator, currVal) => {
        if (currVal <= -1) {
            return accumulator;
        }
        else {
            return accumulator + currVal;
        }
    }, 0);
}

function validNumPinsfromThrow(throwNum, frameScores) {
    const validNumPins = [...Array(11).keys()];  // [0 ... 10]
    switch (throwNum) {
        case 1:
            break;
            
        case 2:
            break;

        case 3:
            break;

        default:
            return [];
    }
}

export class Game {
    /**
     * Frames hold values -1, 0 <-> 10 (indicating no score, gutter to spare/strike)
     */
    constructor () {
        this.framesOneToEleven = create2DArray(2, 11);
        this.frameTwelve = Array(3);
        this.maxScore = 300;
    }

    setFrame(frameNumber, newScores) {
        if (posSum(newScores.slice(0, 2)) <= 10) {
            if (frameNumber <= 11) {
                this.framesOneToEleven[frameNumber] = newScores;
            }
            else {
                this.frameTwelve = newScores;
            }
        }
        else {
            // TODO: Error callback here
        }
    }
    getFrame(frameNumber) {
        // For debugging purposes
        if (frameNumber <= 11) {
            return this.framesOneToEleven[frameNumber];
        }
        else {
            return this.frameTwelve[frameNumber];
        }
    }
    getValidNumberPins(frameNumber, throwNumber) {
        // throwNumber is 1, 2, or 3
        if (frameNumber <= 11) {
            
        }
        else { // Frame 12
            
        }
    }
    maxScore() {
        // To calculate max potential score
    }

    importGame() {
        // For importing saved games as an object
    }
    parseGame() {
        // Potential future function for outputting games in a human-readable format
    }

}