import React from 'react';
import './warmUpCard.scss';
import '../cards.scss';
interface WarmUpCardProps {
  wuWeightOne: string | number;
  wuRepsOne: string | number;
  wuWeightTwo: string | number;
  wuRepsTwo: string | number;
  wuWeightThree: string | number;
  wuRepsThree: string | number;
}

const WarmUpCard = ({
  wuWeightOne,
  wuRepsOne,
  wuWeightTwo,
  wuRepsTwo,
  wuWeightThree,
  wuRepsThree,
  ...props
}: WarmUpCardProps) => {
  return (
    <div className='warmup card-container'>
      <div className='card-header-container'>
        <div className='card-header'>Warmup</div>
        <div className='card-subtitle'>targets</div>
      </div>
      <div className='warmup card-data-container'>
        {wuWeightOne} x {wuRepsOne}
      </div>
      <div className='warmup card-data-container'>
        {wuWeightTwo} x {wuRepsTwo}
      </div>
      <div className='warmup card-data-container'>
        {wuWeightThree} x {wuRepsThree}
      </div>
    </div>
  );
};

export default WarmUpCard;
