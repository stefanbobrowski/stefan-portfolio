import { useState, useEffect, useCallback } from 'react';
import styles from './NineSquare.module.scss';

const NineSquare = () => {
  const [spaceArray, setSpaceArray] = useState([
    [1, 2, 3],
    [8, 5, 6],
    [7, 8, 8],
  ]);

  const [currentValue, setCurrentValue] = useState(0);
  const [currentSelection, setCurrentSelection] = useState([0, 0]);
  const [youWon, setYouWon] = useState(false);
  const [moveCounter, setMoveCounter] = useState(0);
  const [activeCell, setActiveCell] = useState<{ i: number; j: number } | null>(null);

  const checkWinCondition = useCallback(
    (arrayToCheck = spaceArray) => {
      const spaceDictionary: { [key: number]: number } = {};
      let breakout = false;
      for (let i = 0; i < arrayToCheck.length; i++) {
        for (let j = 0; j < arrayToCheck[i].length; j++) {
          if (spaceDictionary[arrayToCheck[i][j]]) {
            breakout = true;
            break;
          } else {
            spaceDictionary[arrayToCheck[i][j]] = 1;
          }
        }
        if (breakout) {
          break;
        }
      }
      if (!breakout) {
        setYouWon(true);
      }
    },
    [spaceArray]
  );

  const populateArray = useCallback(() => {
    const freshArray = [];
    for (let i = 0; i < 3; i++) {
      const arrayRow = Array(3)
        .fill(0)
        .map(() => Math.round(1 + Math.random() * 8));
      freshArray.push(arrayRow);
    }
    checkWinCondition(freshArray);
    setSpaceArray(freshArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAllActive = () => {
    setActiveCell(null);
  };

  const handleCellClick = (i: number, j: number) => {
    if (!youWon && JSON.stringify(currentSelection) !== JSON.stringify([i, j])) {
      clearAllActive();
      setActiveCell({ i, j });
      const cellValue = spaceArray[i][j];
      const halfValue = Math.ceil(currentValue / 2);
      if (cellValue === currentValue && cellValue !== 9) {
        spaceArray[i][j] = cellValue + 1;
        spaceArray[currentSelection[0]][currentSelection[1]] = halfValue;
        setCurrentValue(currentValue + 1);
        setMoveCounter(moveCounter + 1);
        checkWinCondition();
      } else if (cellValue === currentValue && cellValue === 9) {
        spaceArray[currentSelection[0]][currentSelection[1]] = halfValue;
        setCurrentValue(cellValue);
        setMoveCounter(moveCounter + 1);
        checkWinCondition();
      } else {
        setCurrentValue(cellValue);
      }
      setCurrentSelection([i, j]);
    }
  };

  useEffect(() => {
    populateArray();
  }, [populateArray]);

  useEffect(() => {
    checkWinCondition();
  }, [checkWinCondition]);

  return (
    <div className={styles.nineSquare}>
      <h2>
        <span className={styles.red}>Nine</span>Square
      </h2>
      <div className={styles.instructions}>
        <p>Select a square of the nine!</p>
        <p>
          When you match a number on another square, it increases by 1, and the previous number is
          cut in half and rounded up.
        </p>
        <p>
          Try to get the numbers <span className={styles.gold}>1, 2, 3, 4, 5, 6, 7, 8, 9</span> on
          the board, in no order, with the least amount of moves.
        </p>
      </div>
      <div className={styles.game}>
        <div className={`${styles.board} ${youWon ? styles.winner : ''}`}>
          {spaceArray.map((row, i) => (
            <div className={styles.row} key={i}>
              {row.map((cell, j) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  className={`${styles.cell} ${activeCell?.i === i && activeCell?.j === j ? styles.active : ''}`}
                  key={j}
                  onClick={() => {
                    handleCellClick(i, j);
                  }}
                  role="button"
                  tabIndex={j}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <h3>Move: {moveCounter}</h3>
        {youWon ? (
          <div className={styles['you-won-popup']}>
            <h2>You Won!!!</h2>
            <p>In {moveCounter} moves! Congratulations! 🎉</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NineSquare;
