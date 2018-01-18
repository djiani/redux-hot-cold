import {reducer} from './index';
import {restartGame, makeGuess, generateAuralUpdate} from '../actions';

describe('reducer', ()=>{
  const correctAnswer = 50;
  const feedback = 'Make your guess!';
  const  guesses = [];
  const auralStatus: '';

  it('should set the initial state', ()=>{
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual({});

  });

  it('Should return the current state on an unknown action', () => {
        let currentState = {
          guesses,
          feedback,
          auralStatus,
          correctAnswer
        };
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('makeGuess', ()=>{
      it('should make a guess', ()=>{
        let state;
        state = reducer(state, makeGuess(10));
        state = reducer(state, makeGues(45));
        expect(state).toEqual({
          guesses:[10, 45],
          feedback: "You're Hot!",
          auralStatus: '',
          correctAnswer: 50
        })
      })
    })

    describe('generateAuralUpdate', ()=>{
      it('should generate auralStatus', ()=>{
        let state;
        state = reducer(state, makeGuess(10));
        state = reducer(state, makeGues(45));
        state = reducer(state, generateAuralUpdate());
        const auralStatusResp = "Here's the status of the game right now: You're Hot!"+"You've made 2 guesses "+
        "In order of most- to least-recent, they are: 45, 10";
        expect(state.auralStatus).toEqual('auralStatusResp');
      })
    })
    describe('restartGame', ()=>{
      it('should reset the game', ()=>{
        let state;
        state = reducer(state, makeGuess(10));
        state = reducer(state, makeGues(45));
        state = reducer(state, restartGame(correctAnswer));
        expect(state).toEqual({
          guesses,
          feedback,
          auralStatus,
          correctAnswer
        });
      });
    })

    
})