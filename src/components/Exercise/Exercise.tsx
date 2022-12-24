import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { useUserContext } from '../../context';
import { weekDays } from '../../assets';
import './exercise.scss';
import { AvailableLifts, LiftObjectType } from '../../types/commonTypes';
import { getAvailableLifts, getUserLifts } from '../../utilities';
import { getLatestLifts } from '../../utilities/functions/getLatestLifts';
import { getLiftProgress } from '../../utilities/functions/getLiftProgress';

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
  // Hooks
  const user = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [availableLifts, setAvailableLifts] = useState<AvailableLifts>({});
  const [today, setToday] = useState(weekDays[new Date().getDay()]);
  const [liftList, setLiftList] = useState<LiftListType>({});
  const [prevHistory, setPrevHistory] = useState();
  const [progress, setProgress] = useState({});
  const [todaysLifts, setTodaysLifts] = useState();

  // Const
  const userName = user.user.username || 'you should log in!';
  const userId = user.user.id || 'no user id found';

  useEffect(() => {
    /* //NOTE - Gets
      Available Lifts,
      User Selected Lifts for current day,
      Most Recent Lift History For Todays Lifts,
      and Progress Information for Todays Lifts
    */
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [today, userId]);

  useEffect(() => {}, []);

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
