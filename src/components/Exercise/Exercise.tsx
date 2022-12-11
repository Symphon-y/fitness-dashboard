import React from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';

import './exercise.scss';
import { ProgressBars } from '../visualizations';
const Exercise = () => {
  return (
    <motion.div {...contentFade} className='excersize-container'>
      <div className='header-content'>
        <h1>Temporary: Lift</h1>
        <p>Day: temp</p>
      </div>
      <div className='excersize-main-content'>Main stuff here</div>
      <ProgressBars />
    </motion.div>
  );
};

export default Exercise;
