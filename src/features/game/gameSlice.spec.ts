import gameReducer, {
  GameState,
  addPoint, startPlay, restart,
} from './gameSlice';

describe('Game reducer', () => {
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
  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
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
    });
  });

  test('Add point a', () => {
    const actual = gameReducer(initialState, addPoint('a'));
    expect(actual.score).toEqual(10);
  });
  test('Add point for default score', () => {
    const actual = gameReducer(initialState, addPoint('e'));
    expect(actual.score).toEqual(5);
  });
  test('Add point c twice for bonus check', () => {
    const first = gameReducer(initialState, addPoint('c'));
    const actual = gameReducer(first, addPoint('c'));
    expect(actual.score).toEqual(15);
  });
  test('Check alphabet sequence and letter added and alphabet Count and status', () => {
    const stateStart = gameReducer(initialState, startPlay());
    expect(stateStart.letters).toHaveLength(60);
    expect(stateStart.status).toBe("playing");
    const actual = gameReducer(stateStart, addPoint('a'));
    expect(actual.alphabetSequence).toEqual(['a']);
    expect(actual.points).toEqual({'a': 10});
    expect(actual.alphabetCount).toEqual({'a': 1});
  });
  test('Restart', () => {
    const actual = gameReducer(initialState, restart());
    expect(actual.letters).toHaveLength(60);
    expect(actual.alphabetSequence).toEqual([]);
    expect(actual.points).toEqual({});
    expect(actual.alphabetCount).toEqual({});
    expect(actual.score).toEqual(0);
  });
});
