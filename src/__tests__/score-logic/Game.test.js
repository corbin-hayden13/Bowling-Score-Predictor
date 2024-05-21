import { Game } from '../../score-logic';

test("Game.makeGame", () => {
    const testGame = Game.makeGame();
    expect(testGame.framesOneToNine.length).toStrictEqual(9);
    expect(testGame.framesOneToNine[0].length).toStrictEqual(2);
    expect(testGame.frameTen.length).toStrictEqual(3);
});

test("Game.setFrame", () => {
    let testGame = Game.makeGame();
    Game.setFrame(testGame, 1, [0, 7]);
    expect(testGame.framesOneToNine[0]).toStrictEqual([0, 7]);
    
    Game.setFrame(testGame, 2, [0, -1]);
    expect(testGame.framesOneToNine[1]).toStrictEqual([0, -1]);

    Game.setFrame(testGame, 1, [-1, 0]);
    // TODO error handling test
    expect(testGame.framesOneToNine[0]).toStrictEqual([0, 7]);

    Game.setFrame(testGame, 10, [-1, -1, -1]);
    expect(testGame.frameTen).toStrictEqual([-1, -1, -1]);

    Game.setFrame(testGame, 10, [-1, 0, 10]);
    // TODO error handling test
    expect(testGame.frameTen).toStrictEqual([-1, -1, -1]);

    Game.setFrame(testGame, 8, [10, -1]);
    expect(testGame.framesOneToNine[7]).toStrictEqual([10, 0]);

});

test("Game.getValidNumberPins", () => {
    let testGame = Game.makeGame();
    const validPinNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();

    Game.setFrame(testGame, 2, [0, -1]);
    expect(Game.getValidNumberPins(testGame, 2, 2)).toStrictEqual(validPinNums);

    Game.setFrame(testGame, 2, [undefined, undefined]);
    expect(Game.getValidNumberPins(testGame, 2, 1)).toStrictEqual(validPinNums);
    expect(Game.getValidNumberPins(testGame, 10, 3)).toStrictEqual(validPinNums);

    Game.setFrame(testGame, 2, [7, -1]);
    expect(Game.getValidNumberPins(testGame, 2, 2)).toStrictEqual(validPinNums.slice(7));

});

test("Game.currScore", () => {
    let testGame = Game.makeGame();
    Game.setFrame(testGame, 1, [0, 7]);
    expect(Game.currScore(testGame)).toStrictEqual(7);

    Game.setFrame(testGame, 2, [10, 0]);
    Game.setFrame(testGame, 3, [10, 0]);
    Game.setFrame(testGame, 4, [10, 0]);
    Game.setFrame(testGame, 5, [10, 0]);
    Game.setFrame(testGame, 6, [9, 1]);
    Game.setFrame(testGame, 7, [0, 1]);
    Game.setFrame(testGame, 8, [1, 5]);
    Game.setFrame(testGame, 9, [10, 0]);
    Game.setFrame(testGame, 10, [3, 7, 10]);
    expect(Game.currScore(testGame)).toStrictEqual(173);

    testGame = Game.makeGame();
    Game.setFrame(testGame, 1, [0, 7]);
    Game.setFrame(testGame, 2, [10, 0]);
    Game.setFrame(testGame, 3, [10, 0]);
    Game.setFrame(testGame, 4, [10, 0]);
    Game.setFrame(testGame, 5, [10, 0]);
    Game.setFrame(testGame, 6, [9, 1]);
    expect(Game.currScore(testGame)).toStrictEqual(116);
});