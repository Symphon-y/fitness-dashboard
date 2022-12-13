import React from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';
import { Counter, ProgressBars } from '../visualizations';
import { barChartTestData, testDataObjectInterface } from '../../assets';
import './exercise.scss';

const Exercise = () => {
  const barGen = () => {
    let titleArray: string[];
    titleArray = [];
    let objArrayy: { values: number[]; labels: string[] }[];
    objArrayy = [];

    for (var key in barChartTestData) {
      objArrayy.push(barChartTestData[key] as testDataObjectInterface);
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
      <Counter starting={0} ending={2000} />
    </motion.div>
  );
};

export default Exercise;
