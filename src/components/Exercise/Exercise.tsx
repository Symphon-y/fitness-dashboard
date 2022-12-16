import React from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { Counter } from '../visualizations';
import './exercise.scss';
import horizontalBarGenerator from '../../utilities/horizontalBarGenerator';
import { useUserContext } from '../../context';

const Exercise = () => {
  const user = useUserContext();
  const userName = user.user.username || 'you should log in!';
  const userId = user.user.id || 'no user id found';
  return (
    <motion.div {...contentFade} className='excersize-container'>
      <div className='header-content'>
        <h3>Hi, {userName}</h3>
        <h3>{userId}</h3>
        <h1>Temporary: Lift</h1>
        <p>Day: temp</p>
      </div>
      <div className='excersize-main-content'>Main stuff here</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
        {horizontalBarGenerator()}
      </div>
      <Counter starting={0} ending={2000} />
    </motion.div>
  );
};

export default Exercise;
