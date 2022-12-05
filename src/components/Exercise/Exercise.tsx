import React from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';

import './exercise.scss';
const Exercise = () => {
  return (
    <motion.div {...contentFade} className='excersize-container'>
      <div className='header-content'>
        <h1>Temporary: Lift</h1>
        <p>Day: temp</p>
      </div>
      <div className='excersize-main-content'>Main stuff here</div>
    </motion.div>
  );
};

export default Exercise;
