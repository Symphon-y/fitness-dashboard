import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { useUserContext } from '../../context';
import { weekDays } from '../../assets';
import {
  AvailableLifts,
  LiftEntryInterface,
  LiftEntryType,
} from '../../types/commonTypes';
import {
  getLiftProgress,
  getAvailableLifts,
  getUserLifts,
  getLatestLifts,
  roundNearestFive,
} from '../../utilities';
import './exercise.scss';
import { useImmer } from 'use-immer';

export interface LiftProgress {
  id: string;
  user_id: string;
  lift_id: number;
  target_met: boolean;
  target_stage: number;
  days_missed: number;
}
export type LiftProgressType = {
  [id: string]: LiftProgress;
};
export interface LiftListInterface {
  id: string;
  user_id: string;
  lift_id: number;
  orm: number;
  selected_days: string[];
  progress: number;
}

export type LiftListType = {
  [lift_id: string]: LiftListInterface;
};

const Exercise = () => {
  //SECTION - Hooks
  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  // All Available Lifts
  const [availableLifts, setAvailableLifts] = useState<AvailableLifts>({});
  // Day of the week //TODO - extract this to a hook that automatically updates
  const [today, setToday] = useState(weekDays[new Date().getDay()]);
  // const [today, setToday] = useState('Sunday');

  //SECTION - Today's Lift Information
  // List of the User's Lifts for the day (containing ORM)
  const [liftList, setLiftList] = useState<LiftListType>({});
  const [liftListKeyArray, setLiftListKeyArray] = useState<string[]>();
  const [liftListKeyArrayIndex, setLiftListKeyArrayIndex] = useState(0);
  // Most Recent Lift History
  const [prevHistory, setPrevHistory] = useState<LiftEntryType>();
  // Progression History for Today's Lifts
  const [progress, setProgress] = useState<LiftProgressType>({});
  // Calculated Lift Targets for Today's Workout
  const [todaysLifts, setTodaysLifts] = useImmer<LiftEntryType>({});

  //SECTION - Current Lift State
  // Current Lift index from todaysLifts
  const [currentLift, setCurrentLift] = useState<string>();
  // Current set index for repKeyArray
  const [currentSet, setCurrentSet] = useState<number>(0);
  // Rep Counter
  const [repCount, setRepCount] = useState<number>(0);
  // Todays results for post request
  const [repState, setRepState] = useState<LiftEntryInterface>();

  // Array with rep key names paired with human language
  const repKeyArray = [
    ['wu_reps_1', 'Warm Up 1'],
    ['wu_reps_2', 'Warm Up 2'],
    ['wu_reps_3', 'Warm Up 3'],
    ['ws_reps_1', 'Working Set 1'],
    ['ws_reps_2', 'Working Set 2'],
    ['ws_reps_3', 'Working Set 3'],
  ];

  // User Context
  const user = useUserContext();
  const userName = user.user.username || 'you should log in!';
  const userId = user.user.id || 'no user id found';

  useEffect(() => {
    //NOTE - Gets Lift Information
    setIsLoading(true);
    getAvailableLifts(setAvailableLifts)
      .then(async () => {
        getUserLifts(userId, today).then((lifts) => {
          setLiftList(lifts);
          setLiftListKeyArray(Object.keys(lifts));
          getLatestLifts(lifts, userId).then((latestLiftsFormatted) => {
            setPrevHistory(latestLiftsFormatted);
            getLiftProgress(lifts, userId, setProgress);
          });
        });
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [today, userId]);

  useEffect(() => {
    //NOTE - Calculates Todays' Lifts
    // Create the return object
    let formattedResult: LiftEntryType = {};
    // Create known constants
    const wu_reps_1 = 5;
    const wu_reps_2 = 3;
    const wu_reps_3 = 1;
    const ws_reps_1 = '4-6';
    const ws_reps_2 = '6-8';
    const ws_reps_3 = '8-10';
    // Get array of Lift Id's (used as keys)
    const keys = Object.keys(liftList);
    // for each key
    if (!isLoading && keys.length > 0) {
      setIsLoading(true);
      keys.forEach((key) => {
        // check progress
        const targetStage = progress[key].target_stage;
        switch (targetStage) {
          // if 0
          case 0:
            const orm = liftList[key].orm;
            const heaviestWeight = roundNearestFive(orm * 0.9);
            const middleWeight = roundNearestFive(orm * 0.8);
            const lightestWeight = roundNearestFive(orm * 0.7);
            const warmupOne = roundNearestFive(heaviestWeight * 0.6);
            const warmupTwo = roundNearestFive(heaviestWeight * 0.75);
            const warmupThree = roundNearestFive(heaviestWeight * 0.9);
            // calculate initial lifts based on ORM
            formattedResult = {
              ...formattedResult,
              [key]: {
                lift_id: key,
                user_id: userId,
                created_at: new Date(),
                wu_weight_1: warmupOne,
                wu_reps_1: wu_reps_1,
                wu_weight_2: warmupTwo,
                wu_reps_2: wu_reps_2,
                wu_weight_3: warmupThree,
                wu_reps_3: wu_reps_3,
                ws_weight_1: lightestWeight,
                ws_reps_1: ws_reps_1,
                ws_weight_2: middleWeight,
                ws_reps_2: ws_reps_2,
                ws_weight_3: heaviestWeight,
                ws_reps_3: ws_reps_3,
              },
            };
            break;
          // if 1
          case 1:
            // get prev history and add 5 lbs to lightest set
            if (prevHistory) {
              const newWeight = prevHistory[key].ws_weight_1 + 5;
              formattedResult[key] = {
                ...prevHistory[key],
                ws_weight_1: newWeight,
              };
            }
            break;
          // if 2
          case 2:
            // get prev history and add 5 lbs to middle set
            if (prevHistory) {
              const newWeight = prevHistory[key].ws_weight_2 + 5;
              formattedResult[key] = {
                ...prevHistory[key],
                ws_weight_1: newWeight,
              };
            }
            break;
          // if 3
          case 3:
            // get prev history and add 5 lbs to heaviest set
            if (prevHistory) {
              const newWeight = prevHistory[key].ws_weight_3 + 5;
              formattedResult[key] = {
                ...prevHistory[key],
                ws_weight_1: newWeight,
              };
            }
            break;
        }
      });
    }
    if (liftListKeyArray) {
      setCurrentLift(liftListKeyArray[liftListKeyArrayIndex]);
    }
    setTodaysLifts(formattedResult);
    setIsLoading(false);
  }, [progress]);

  //SECTION Lift Information
  let liftName = currentLift
    ? availableLifts[currentLift].lift_name
    : 'loading...';
  //SECTION Warm up variables
  let wuWeightOne = currentLift
    ? todaysLifts[currentLift].wu_weight_1
    : 'loading...';
  let wuRepsOne = currentLift
    ? todaysLifts[currentLift].wu_reps_1
    : 'loading...';
  let wuWeightTwo = currentLift
    ? todaysLifts[currentLift].wu_weight_2
    : 'loading...';
  let wuRepsTwo = currentLift
    ? todaysLifts[currentLift].wu_reps_2
    : 'loading...';
  let wuWeightThree = currentLift
    ? todaysLifts[currentLift].wu_weight_3
    : 'loading...';
  let wuRepsThree = currentLift
    ? todaysLifts[currentLift].wu_reps_3
    : 'loading...';
  //SECTION Working Set variables
  let wsWeightOne = currentLift
    ? todaysLifts[currentLift].ws_weight_1
    : 'loading...';
  let wsRepsOne = currentLift
    ? todaysLifts[currentLift].ws_reps_1
    : 'loading...';
  let wsWeightTwo = currentLift
    ? todaysLifts[currentLift].ws_weight_2
    : 'loading...';
  let wsRepsTwo = currentLift
    ? todaysLifts[currentLift].ws_reps_2
    : 'loading...';
  let wsWeightThree = currentLift
    ? todaysLifts[currentLift].ws_weight_3
    : 'loading...';
  let wsRepsThree = currentLift
    ? todaysLifts[currentLift].ws_reps_3
    : 'loading...';

  return (
    <motion.div {...contentFade} className='excersize-container'>
      <div className='header-content'>
        <div>
          <h3>Hi, {userName}</h3>
        </div>
        <h1>{`Lift: ${liftName}`}</h1>
        <p>Day: {today}</p>
      </div>
      <div className='excersize-main-content'>
        {currentLift ? (
          //SECTION Target Lift Cards
          //TODO extract this to a seperate component
          <motion.div {...contentFade}>
            <div>
              <div>
                <div>Warmup</div>
                <div>targets</div>
                <div>
                  {wuWeightOne} x {wuRepsOne}
                </div>
                <div>
                  {wuWeightTwo} x {wuRepsTwo}
                </div>
                <div>
                  {wuWeightThree} x {wuRepsThree}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>Working Sets</div>
                <div>targets</div>
                <div>
                  {wsWeightOne} x {wsRepsOne}
                </div>
                <div>
                  {wsWeightTwo} x {wsRepsTwo}
                </div>
                <div>
                  {wsWeightThree} x {wsRepsThree}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
        <motion.div {...contentFade}>
          <div>
            <div>Current Set</div>
            <div>{repKeyArray[currentSet][1]}</div>
            <div>
              <div
                onClick={() => {
                  if (repCount > 0) {
                    const newCount = repCount - 1;
                    setRepCount(newCount);
                  }
                }}>
                {' '}
                -{' '}
              </div>
              <div>Reps {repCount} </div>
              <div
                onClick={() => {
                  const newCount = repCount + 1;
                  setRepCount(newCount);
                }}>
                {' '}
                +{' '}
              </div>
            </div>
            <button
              onClick={(e) => {
                //TODO set reps in state
                const repKey = repKeyArray[currentSet][0];
                if (currentLift) {
                  setTodaysLifts((draftState: any) => {
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Exercise;
