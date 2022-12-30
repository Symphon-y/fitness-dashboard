import React from 'react';
import './resultsCard.scss';
import '../cards.scss';
const ResultsCard = ({
  repKeyArray,
  currentSet,
  repCount,
  setRepCount,
  currentLift,
  setTodaysResults,
  liftListKeyArray,
  liftListKeyArrayIndex,
  setCurrentLift,
  setCurrentSet,
  ...props
}: any) => {
  return (
    <div className='results-card-container'>
      <div className='card-header-container'>
        <div className='card-header'>Current Set</div>
        <div className='card-subtitle'>{repKeyArray[currentSet][1]}</div>
      </div>
      <div className='results-rep-count-container'>
        <div className='rep-counter'>
          Reps
          <div
            className='rep-counter-btns'
            onClick={() => {
              if (repCount > 0) {
                const newCount = repCount - 1;
                setRepCount(newCount);
              }
            }}>
            {' '}
            -{' '}
          </div>
          <div className='rep-counter-count'>{repCount} </div>
          <div
            className='rep-counter-btns'
            onClick={() => {
              const newCount = repCount + 1;
              setRepCount(newCount);
            }}>
            {' '}
            +{' '}
          </div>
        </div>
      </div>
      <button
        className='results-next-btn'
        onClick={(e) => {
          const repKey = repKeyArray[currentSet][0];
          if (currentLift) {
            setTodaysResults((draftState: any) => {
              draftState[currentLift][repKey] = repCount;
            });
          }
          const nextSet =
            currentSet < repKeyArray.length - 1 ? currentSet + 1 : 0;
          if (currentSet === repKeyArray.length - 1 && liftListKeyArray) {
            const nextLift = liftListKeyArrayIndex + 1;
            setCurrentLift(liftListKeyArray[nextLift]);
          }
          setCurrentSet(nextSet);
          setRepCount(0);
        }}>
        next
      </button>
    </div>
  );
};

export default ResultsCard;
