import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectState,
  startPlay,
} from './gameSlice';
import styles from './Game.module.css';
import ScorePanel from './scorePanel';
import PlayPanel from './playPanel';

export function Game() {
  const {status} = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  return <div className={styles.GameScreen}>
    {status === 'idle' ? <div className='startPanel'>
      <div>
        <div className='jumboText'>Press Start To play</div>
        <br />
        <br />
        <button className='button' onClick={() => {
          dispatch(startPlay());
        }}>Start</button>
      </div>
      </div> : <div className={styles.GridLayout}>
      <PlayPanel />
      <ScorePanel />
    </div>}
  </div>
}
