import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addPoint, 
  Alphabets,
  selectState,
  restart
} from '../gameSlice';
import { Popup } from '../../../components';
import styles from './PlayPanel.module.css';

const Button = ({letter, onClick, pressed}: {letter: string, onClick: () => void, pressed: boolean}) => {
  return <button
  className={styles.FlexButton + ' button' + (pressed ? ' clicked' : '')}
  onClick={(e) => {
    onClick();
  }}
>
  {letter}
</button>
}

const PlayPanel = () => {
  const { letters, status, score} = useAppSelector(selectState);

  const dispatch = useAppDispatch();

  const [pressed, setPressed] = useState<number[]>([]);

  useEffect(() => {
   setPressed([]);
  }, [letters])

  return <div className='panel-grid'>
    <header>
      Letter Points
    </header>
    {status === "playing" ? <div className={styles.PanelLayout}>
      {letters.map((m, i) => <Button pressed={pressed.includes(i)} key={i} letter={m} onClick={() => {
        setPressed([...pressed, i]);
        dispatch(addPoint(m as Alphabets))
      }}/>
      )}
    </div> : null
    }
    {
      status === "done" ? <div className={styles.Relative}>
        <Popup>
          <div>
            <div className='jumboText'>You Scored: {score} points</div>
            <br />
            <br />
            <button className='button' onClick={() => {
              dispatch(restart());
            }}>Restart</button>
          </div>
        </Popup>
      </div> : null
    }
  </div>
}

export default PlayPanel;