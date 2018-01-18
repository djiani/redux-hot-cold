import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE, restartGame, makeGuess, generateAuralUpdate } from './index';

describe('MAKE_GUESS', ()=>{
  it('should return the action', () => {
    const guess = 34; 
    const action = makeGuess(guess);
    expect(action.type).toEqual(MAKE_GUESS);
    expect(action.guess).toEqual(guess);
  });

  it('should return the action', ()=>{
    const correctAnswer = 50;
    const action = restartGame(correctAnswer);
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toEqual(correctAnswer);
  });

  it('should return the action', ()=>{
    const action = generateAuralUpdate();
    expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
  });
})