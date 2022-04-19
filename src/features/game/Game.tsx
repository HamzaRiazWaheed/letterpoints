import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectState,
  startPlay,
} from './gameSlice';
import styles from './Game.module.css';
import ScorePanel from './scorePanel';
import PlayPanel from './playPanel';
import { Popup } from '../../components';

export function Game() {
  const {status} = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  return <div className={styles.GameScreen}>
    {status === 'idle' ? <Popup>
        <div>
          <div className='jumboText'>Press Start To play</div>
          <br />
          <br />
          <button className='button' onClick={() => {
            dispatch(startPlay());
          }}>Start</button>
        </div>
      </Popup> : <div className={styles.GridLayout}>
      <PlayPanel />
      <ScorePanel />
    </div>}
  </div>
}
