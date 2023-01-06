import React, { useEffect, useState } from 'react';
import './resultsCard.scss';
import '../cards.scss';
import CountDown from '../PlateCalculatorCard/PlateGenerator/CountDown/CountDown';
const ResultsCard = ({
  repKeyArray,
  currentSet,
  repCount,
  setRepCount,
  currentLift,
  todaysResults,
  setTodaysResults,
  liftListKeyArray,
  liftListKeyArrayIndex,
  setLiftListKeyArrayIndex,
  setCurrentLift,
  setCurrentSet,
  ...props
}: any) => {
  const [submitted, wasSubmitted] = useState<boolean>(false);
  const [needsTimer, setNeedsTimer] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('next');

  useEffect(() => {
    if (liftListKeyArray) {
      if (repKeyArray[currentSet][1] === 'Working Set 3') {
        setButtonText('submit');
      }
    }
  }, [needsTimer]);

  const handleSubmit = () => {
    console.log(todaysResults);
    // do stuff
    const payload = {
      ...todaysResults,
    };

    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    fetch('/lift-entry', requestOptions)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };

  const handleNext = (e: any) => {
    const repKey = repKeyArray[currentSet][0];
    if (currentLift) {
      setTodaysResults((draftState: any) => {
        draftState[currentLift][repKey] = repCount;
      });
    }
    const nextSet = currentSet < repKeyArray.length - 1 ? currentSet + 1 : 0;
    if (currentSet === repKeyArray.length - 1 && liftListKeyArray) {
      const nextLift = liftListKeyArrayIndex + 1;
      if (liftListKeyArray[nextLift]) {
        setCurrentLift(liftListKeyArray[nextLift]);
        setLiftListKeyArrayIndex(nextLift);
      } else {
        wasSubmitted(true);
      }
    }
    if (currentSet > 1) {
      setNeedsTimer(true);
    }
    setCurrentSet(nextSet);
    setRepCount(0);
    e.preventDefault();
  };

  useEffect(() => {
    if (submitted) {
      handleSubmit();
    }
  }, [submitted]);

  return (
    <div className='results-card-container'>
      {needsTimer ? (
        <CountDown initialTime={180} setNeedsTimer={setNeedsTimer} />
      ) : (
        <>
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
          <button className='results-next-btn' onClick={(e) => handleNext(e)}>
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
};

export default ResultsCard;
