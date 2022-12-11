import { motion } from 'framer-motion';
import React from 'react';
import './progressBars.scss';

const tempData = {
  'Leader Board': {
    values: [12, 20, 35, 88, 75],
    labels: ['Ash', 'Jake', 'Bill', 'Travis', 'Mike'],
  },
};

const ProgressBars = ({ title, data }: any) => {
  data = data || tempData;
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
      const widthRounded = Math.round(width * 10) / 10;
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
    // get percentage based on current value
    // return label at current index
    // return bar with width equal to percentage inside div of 100% width
  };

  return (
    <div className='prog-bar-main'>
      <div className='prog-bar-header'>{title}</div>
      <div className='prog-bar-container'>{barGenerator()}</div>
    </div>
  );
};

export default ProgressBars;
