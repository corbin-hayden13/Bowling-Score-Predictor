import React from 'react';
import { render, screen } from '@testing-library/react';
import { Game } from '../../score-logic';

test("Testing game components construction", () => {
    const testGame = new Game();
    expect(testGame.framesOneToNine.length).toStrictEqual(9);
    expect(testGame.framesOneToNine[0].length).toStrictEqual(2);
    expect(testGame.frameTen.length).toStrictEqual(3);
});

test("Game.setFrame", () => {
    let testGame = new Game();
    testGame.setFrame(1, [0, 7]);
    expect(testGame.framesOneToNine[0]).toStrictEqual([0, 7]);
    
    testGame.setFrame(2, [0, -1]);
    expect(testGame.framesOneToNine[1]).toStrictEqual([0, -1]);

    testGame.setFrame(1, [-1, 0]);
    // TODO error handling test
    expect(testGame.framesOneToNine[0]).toStrictEqual([0, 7]);

    testGame.setFrame(10, [-1, -1, -1]);
    expect(testGame.frameTen).toStrictEqual([-1, -1, -1]);

    testGame.setFrame(10, [-1, 0, 10]);
    // TODO error handling test
    expect(testGame.frameTen).toStrictEqual([-1, -1, -1]);

    testGame.setFrame(8, [10, -1]);
    expect(testGame.framesOneToNine[7]).toStrictEqual([10, 0]);

});

test("Game.getValidNumberPins", () => {
    let testGame = new Game();
    const validPinNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();

    testGame.setFrame(2, [0, -1]);
    expect(testGame.getValidNumberPins(2, 2)).toStrictEqual(validPinNums);

    testGame.setFrame(2, [undefined, undefined]);
    expect(testGame.getValidNumberPins(2, 1)).toStrictEqual(validPinNums);
    expect(testGame.getValidNumberPins(10, 3)).toStrictEqual(validPinNums);

    testGame.setFrame(2, [7, -1]);
    expect(testGame.getValidNumberPins(2, 2)).toStrictEqual(validPinNums.slice(7));

});