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
    data[title].values.forEach((value: number) => {
      total += value;
    });
    // return map over values
    return data[title].values.map((value: any, index: any) => {
      const width = (value / total) * 100;
      const barAnimation = {
        initial: { width: 0 },
        animate: {
          width: width,
          transition: { type: 'spring', stiffness: 100, duration: 1 },
        },
        exit: {
          x: 0,
          transition: { type: 'spring', stiffness: 100, duration: 1 },
        },
      };
      return (
        <div className='prob-bar-container'>
          <div>{data[title].labels[index]}</div>
          <div
            className='prog-bar-bg'
            style={{
              backgroundColor: 'blue',
              width: '100%',
              height: '1rem',
            }}>
            <motion.div
              {...barAnimation}
              style={{
                backgroundColor: 'red',
                width: `${width}%`,
                height: '1rem',
              }}>
              {`${width}%`}
            </motion.div>
          </div>
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
