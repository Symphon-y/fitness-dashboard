import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { useUserContext } from '../../context';
import { weekDays } from '../../assets';
import { AvailableLifts } from '../../types/commonTypes';
import { getLiftProgress } from '../../utilities/functions/getLiftProgress';
import {
  getAvailableLifts,
  getUserLifts,
  getLatestLifts,
} from '../../utilities';
import './exercise.scss';

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

  //SECTION - Today's Lift Information
  // List of Todays Lifts
  const [liftList, setLiftList] = useState<LiftListType>({});
  // Most Recent Lift History
  const [prevHistory, setPrevHistory] = useState();
  // Progression History for Today's Lifts
  const [progress, setProgress] = useState({});
  // Calculated Lift Targets for Today's Workout
  const [todaysLifts, setTodaysLifts] = useState();

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
  }, []);

  return (
    <motion.div {...contentFade} className='excersize-container'>
      <div className='header-content'>
        <div>
          <h3>Hi, {userName}</h3>
        </div>
        <h1>Temporary: Lift</h1>
        <p>Day: {today}</p>
      </div>
      <div className='excersize-main-content'>Main stuff here</div>
    </motion.div>
  );
};

export default Exercise;
