import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { useUserContext } from '../../context';
import { useImmer } from 'use-immer';
import {
  getAvailableLifts,
  getLiftData,
  getTodaysLifts,
} from '../../utilities';
import { weekDays } from '../../assets';
import './exercise.scss';
import { AvailableLifts, LiftObjectType } from '../../types/commonTypes';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import {
  getLatestLifts,
  LiftListType,
} from '../../utilities/functions/getLatestLifts';

const Exercise = () => {
  // Hooks
  const user = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [availableLifts, setAvailableLifts] = useState<AvailableLifts>({});
  const [today, setToday] = useState(weekDays[new Date().getDay()]);
  const [liftList, setLiftList] = useState<LiftListType>({});
  const [prevHistory, setPrevHistory] = useState();
  const [progress, setProgress] = useState({});
  // Const
  const userName = user.user.username || 'you should log in!';
  const userId = user.user.id || 'no user id found';
  useEffect(() => {
    setIsLoading(true);
    let availableLiftsFormatted = {} as AvailableLifts;
    fetch(`/available-lifts`)
      .then((res: any) => {
        const response = res.json();
        // iterate over array
        return response;
      })
      .then((res) => {
        res.forEach((liftObject: LiftObjectType) => {
          let id = liftObject.id;
          availableLiftsFormatted[id] = { ...liftObject };
        });
      })
      .then(async () => {
        setAvailableLifts(availableLiftsFormatted);
        let todaysLifts = {} as LiftListType;
        fetch(`/user-lifts/${userId}`)
          .then(async (res) => {
            const response = await res.json();
            response.forEach((lift: any) => {
              lift.selected_days.forEach((day: string) => {
                if (day === today) {
                  todaysLifts[lift.lift_id] = { ...lift };
                }
              });
            });
            return todaysLifts;
          })
          .then((lifts) => {
            setLiftList(lifts);
            let latestLiftsFormatted: any;
            latestLiftsFormatted = {};
            const liftListKeys = Object.keys(lifts);
            liftListKeys.forEach((liftId: string) => {
              fetch(`/latest-lift/${userId}/${liftId}`)
                .then(async (res) => {
                  const response = await res.json();
                  latestLiftsFormatted[liftId] = response;
                })
                .then(() => {
                  setPrevHistory(latestLiftsFormatted);
                  var liftListKeys = Object.keys(lifts);
                  liftListKeys.forEach((lift) => {
                    let liftId = `${userId}${lift}`;
                    fetch(`/lift_progress/${liftId}`)
                      .then((res) => {
                        const response = res.json();
                        return response;
                      })
                      .then((res) => {
                        setProgress((progress) => ({
                          ...progress,
                          [lift]: { ...res },
                        }));
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [today, userId]);

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
