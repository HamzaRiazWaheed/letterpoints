import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export enum Alphabets {
  'a' = 'a','b' = 'b','c' = 'c','d' = 'd','e' = 'e','f' = 'f','g' = 'g','h' = 'h', 'i' = 'i', 'j' = 'j'
}

type Points = {
  [key in Alphabets]?: number;
};

type Bonus = {
  [key in Alphabets]?: {
    count: number;
    points: number;
  };
}

type Settings = {
  points: Points;
  bonuses: Bonus;
  default: number;
}
type AlphabetArray = (keyof typeof Alphabets)[];

export interface GameState {
  score: number;
  points: Points;
  letters: AlphabetArray;
  alphabetCount: Points;
  alphabetSequence: AlphabetArray;
  bonus: number;
  status: 'done' | 'playing' | 'idle';
  setting:  Settings;
}



const initialState: GameState = {
  score: 0,
  points: {},
  bonus: 0,
  alphabetCount: {},
  alphabetSequence: [],
  letters: [],
  status: 'idle',
  setting: {
    points: {'a': 10, 'b': 10},
    bonuses: {
      c: {
        count: 2,
        points: 15
      },
      d: {
        count: 2,
        points: 15
      }
    },
    default: 5
  }
};

const getPoint = (state: GameState, letter: keyof typeof Alphabets): {points: number, bonus: number} => {
  let points = state.setting.points[letter] ?? state.setting.default;
  
  let bonus = 0;
  const countOfLetter = (state.alphabetCount[letter] ?? 0) + 1;
  // check for bonus
  if(state.setting.bonuses[letter] && ((countOfLetter % state.setting.bonuses[letter]!.count) === 0)) {
    points = state.setting.bonuses[letter]!.points - points;
    bonus = state.setting.bonuses[letter]!.points;
  }
  return {points, bonus} 
}

export const shuffleString = (alphabets: string): AlphabetArray => {
  // Increase the length of before shuffling
 return [...alphabets.repeat(6)].sort(()=>Math.random()-.5) as AlphabetArray
}

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPoint: (state, action: PayloadAction<keyof typeof Alphabets>) => {
      const letter = action.payload;
      if(letter) {
        const countOfLetter = (state.alphabetCount[letter] ?? 0) + 1;
        // Get points for the letter
        const {points, bonus} = getPoint(state, letter);
        // update alphabet count
        state.alphabetCount[letter] = countOfLetter;
        // insert Alphabet into sequence
        state.alphabetSequence = [...state.alphabetSequence, letter];
        // update points json
        state.points[letter] = (state.points[letter] ?? 0) + points;
        // update Score
        state.score += points;
        // update bonus
        state.bonus += bonus;
        // check if game is completed
        if(state.letters.length === state.alphabetSequence.length) state.status = "done" 
      }
    },
    startPlay: (state) => {
      console.log('start play');
      state.status = "playing";
      state.letters = shuffleString(Object.keys(Alphabets).join(''));
    },
    restart: (state) => {
      return {...initialState, status : "playing", letters: shuffleString(Object.keys(Alphabets).join(''))}
    }
  }
});

export const { addPoint, startPlay, restart } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectState = (state: RootState) => state.game;

export default gameSlice.reducer;
