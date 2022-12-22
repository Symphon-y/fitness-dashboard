import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';

import './home.scss';
import { useImmer } from 'use-immer';
import { useUserContext } from '../../context';
import { getLiftData } from '../../utilities';
import { Counter, LineChart } from '../visualizations';
import { serialize } from 'v8';

const Home = () => {
  const [lift, setLift] = useState(1);
  const [liftData, setLiftData] = useImmer({
    labels: [] as string[],
    datasets: [
      {
        label: 'Dataset 1',
        data: [] as number[],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  const user = useUserContext();
  const userName = user.user.username || 'you should log in!';
  const userId = user.user.id || 'no user id found';

  useEffect(() => {
    getLiftData(lift, userId, setLiftData);
  }, [lift, userId]);

  return (
    <motion.div {...contentFade} className='main-content-container'>
      <div>
        <h3>Hi, {userName}</h3>
      </div>
      <LineChart data={liftData} />
      <Counter starting={0} ending={2000} />
    </motion.div>
  );
};

export default Home;
