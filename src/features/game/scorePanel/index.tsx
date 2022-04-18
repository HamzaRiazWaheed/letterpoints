import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  Alphabets,
  restart,
  selectState
} from '../gameSlice';
import styles from './ScorePanel.module.css';

const ScorePanel = () => {
  const {points, alphabetCount, bonus, score} = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  return <div className='panel-grid'>
    <header>
      Player Items
    </header>
    <div className={styles.ScorePanel}>
      <div className={styles.TableWrapper}>
        <table className={styles.Table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(points).map((m,i) => {
            return <tr key={i}>
              <td><span className={styles.TableAlphabet}>{m}</span></td>
              <td>{alphabetCount[m as Alphabets]}</td>
              <td>{points[m as Alphabets]}</td>
            </tr>
          })}
        </tbody>
      </table>
      </div>
      <div className={styles.ScoreCard}>
        <strong>Bonus</strong>: {bonus}
      </div>
      <div>
      <div className={styles.ScoreCard}>
        <strong>Total</strong>: {score}
      </div>
      <br />
      <button className='button' onClick={() => {
        dispatch(restart());
      }}>New Game</button>
      </div>
    </div>
  </div>
}

export default ScorePanel;