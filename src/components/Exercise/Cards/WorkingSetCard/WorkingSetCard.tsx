import React from 'react';
import './workingSetCard.scss';
import '../cards.scss';

interface WorkingSetCardProps {
  wsWeightOne: string | number;
  wsRepsOne: string | number;
  wsWeightTwo: string | number;
  wsRepsTwo: string | number;
  wsWeightThree: string | number;
  wsRepsThree: string | number;
}

const WorkingSetCard = ({
  wsWeightOne,
  wsRepsOne,
  wsWeightTwo,
  wsRepsTwo,
  wsWeightThree,
  wsRepsThree,
  ...props
}: WorkingSetCardProps) => {
  return (
    <div className='warmup card-container'>
      <div className='card-header-container'>
        <div className='card-header'>Working Sets</div>
        <div className='card-subtitle'>targets</div>
      </div>
      <div className='card-data-container'>
        {wsWeightOne} x {wsRepsOne}
      </div>
      <div className='card-data-container'>
        {wsWeightTwo} x {wsRepsTwo}
      </div>
      <div className='card-data-container'>
        {wsWeightThree} x {wsRepsThree}
      </div>
    </div>
  );
};

export default WorkingSetCard;
