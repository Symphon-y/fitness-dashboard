import { motion } from 'framer-motion';
import React from 'react';
import './progressBars.scss';

const ProgressBars = ({ title, data }: any) => {
  const titleArray = Object.keys(data);
  title = title || titleArray[0];

  const barGenerator = () => {
    let total = 0;
    // Get total
    // iterate over values and add them to total variable
    data.values.forEach((value: number) => {
      total += value;
    });
    // return map over values
    return data.values.map((value: any, index: any) => {
      const width = (value / total) * 100;
      // Round to one decimal point
      const widthRounded = Math.round(width * 10) / 10;
      // Animate the bar background on load
      const barbgAnimation = {
        initial: { width: 0 },
        animate: {
          width: '100%',
          transition: { type: 'spring', stiffness: 100, duration: 1 },
        },
        exit: {
          x: 0,
          transition: { type: 'spring', stiffness: 100, duration: 1 },
        },
      };

      // Animate the data bar on load
      const barAnimation = {
        initial: { width: 0 },
        animate: {
          width: `${width}%`,
          transition: {
            type: 'spring',
            delay: 0.25,
            stiffness: 100,
            duration: 1,
          },
        },
        exit: {
          x: 0,
          transition: { type: 'spring', stiffness: 100, duration: 1 },
        },
      };

      return (
        <div className='prog-bar-container'>
          <motion.div {...barbgAnimation} className='prog-bar-label-container'>
            <span className='prog-bar-label'>{data.labels[index]}</span>
            <span className='prog-bar-percentage'>{`${widthRounded}%`}</span>
          </motion.div>
          <motion.div
            {...barbgAnimation}
            className='prog-bar-bg'
            style={{
              backgroundColor: '#D9E5F6',
              height: '1.5rem',
            }}>
            <motion.div
              {...barAnimation}
              style={{
                backgroundColor: '#2B6245',
                height: '1.5rem',
              }}></motion.div>
          </motion.div>
        </div>
      );
    });
  };

  return (
    <div className='prog-bar-main'>
      <div className='prog-bar-header'>{title}</div>
      <div className='prog-bar-container'>{barGenerator()}</div>
    </div>
  );
};

export default ProgressBars;
