import {reducer} from './index';
import {restartGame, makeGuess, generateAuralUpdate} from '../actions';

describe('reducer', () => {
  const correctAnswer = 50;
  let feedback = 'Make your guess!';
  let  guesses = [];
  let auralStatus: '';

  it('should set the initial state', ()=>{
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.auralStatus).toEqual('');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);

  });

  it('Should return the current state of an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('makeGuess', ()=>{
      it('should make a guess', ()=>{
        let state = {
          guesses:[],
          feedback: " ",
          auralStatus: '',
          correctAnswer: 90
        };
        state = reducer(state, makeGuess(10));
        expect(state.guesses).toEqual([10])
        expect(state.feedback).toEqual("You're Ice Cold...");
        expect(state.correctAnswer).toEqual(90);

        state = reducer(state, makeGuess(60));
        expect(state.guesses).toEqual([10, 60])
        expect(state.feedback).toEqual("You're Cold...");
        expect(state.correctAnswer).toEqual(90);
        
        state = reducer(state, makeGuess(80));
        expect(state.guesses).toEqual([10, 60, 80])
        expect(state.feedback).toEqual("You're Warm.");
        expect(state.correctAnswer).toEqual(90);

        state = reducer(state, makeGuess(85));
        expect(state.guesses).toEqual([10, 60, 80])
        expect(state.feedback).toEqual("You're Hot!");
        expect(state.correctAnswer).toEqual(90);

        state = reducer(state, makeGuess(90));
        expect(state.guesses).toEqual([10, 60, 80, 90])
        expect(state.feedback).toEqual('You got it!');
        expect(state.correctAnswer).toEqual(90);
      })
    })

    describe('generateAuralUpdate', ()=>{
      it('should generate auralStatus', ()=>{
        let state;
        state = reducer(state, makeGuess(10));
        state = reducer(state, makeGuess(45));
        state = reducer(state, generateAuralUpdate());
        const auralStatusResp = "Here's the status of the game right now: You're Hot!"+"You've made 2 guesses "+
        "In order of most- to least-recent, they are: 45, 10";
        expect(state.auralStatus).toEqual('auralStatusResp');
      })
    })

    describe('restartGame', ()=>{
      it('should reset the game', ()=>{
        let state = {
          guesses:[20, 30, 59, 50],
          feedback: " ",
          auralStatus: '',
          correctAnswer: 90
        };
        correctAnswer = 35;
        state = reducer(state, restartGame(correctAnswer));
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual("Make your guess!");
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toEqual(correctAnswer);
          
      });
    })

    
})