import React from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { ProgressBars } from '../visualizations';

import './exercise.scss';

interface testDataInterface {
  [key: string]: { values: number[]; labels: string[] };
}

interface testDataObjectInterface {
  values: number[];
  labels: string[];
}

const Exercise = () => {
  const testData: { [key: string]: {} } = {
    'Test One': {
      values: [12, 20, 35, 88, 75],
      labels: ['Ash', 'Jake', 'Bill', 'Travis', 'Mike'],
    },
    'Test Two': {
      values: [100, 50, 75, 100, 25],
      labels: ['One', 'Two', 'Three', 'Four', 'Five'],
    },
    'Test Three': {
      values: [1, 3, 2, 3, 5],
      labels: ['A', 'B', 'C', 'D', 'E'],
    },
    'Test Four': {
      values: [10, 34, 23, 35, 55],
      labels: ['Another', 'One', 'DJ', 'Khalid', 'WEDABEST'],
    },
    'Test Five': {
      values: [1, 3, 2, 3, 5],
      labels: ['A', 'B', 'C', 'D', 'E'],
    },
    'Test Size': {
      values: [1, 3, 2, 3, 5],
      labels: ['A', 'B', 'C', 'D', 'E'],
    },
  } as testDataInterface;

  const barGen = () => {
    let titleArray: string[];
    titleArray = [];
    let objArrayy: { values: number[]; labels: string[] }[];
    objArrayy = [];

    for (var key in testData) {
      objArrayy.push(testData[key] as testDataObjectInterface);
      titleArray.push(key);
    }

    return objArrayy.map((dataSet, index) => {
      const title = titleArray[index];
      return <ProgressBars title={title} data={dataSet} />;
    });
  };

  return (
    <motion.div {...contentFade} className='excersize-container'>
      <div className='header-content'>
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
        {barGen()}
      </div>
    </motion.div>
  );
};

export default Exercise;
