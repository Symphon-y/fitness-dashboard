import React, { useEffect, useState } from 'react';
import {
  Five,
  FortyFive,
  Ten,
  TwentyFive,
  TwoPointFive,
} from './PlateGenerator/plateComponents';
import './plateCalculatorCard.scss';
import '../cards.scss';
import { useImmer } from 'use-immer';

interface PlateNumberInterface {
  fortyFives: number;
  twentyFives: number;
  tens: number;
  fives: number;
  twoPointFives: number;
}

const PlateCalculatorCard = ({ currentWeight, ...props }: any) => {
  const [barWeight, setBarWeight] = useState<number>(45);
  const [plateNumbers, setPlateNumbers] = useImmer<PlateNumberInterface>({
    fortyFives: 0,
    twentyFives: 0,
    tens: 0,
    fives: 0,
    twoPointFives: 0,
  });

  const barbellPlateCalculator = () => {
    const weightToAdd = currentWeight - barWeight;
    const fortyFives = Math.floor(weightToAdd / (2 * 45));
    setPlateNumbers((plateNumbers) => {
      plateNumbers.fortyFives = fortyFives;
    });

    const twentyFives = Math.floor(
      (weightToAdd - fortyFives * 45 * 2) / (2 * 25)
    );
    setPlateNumbers((plateNumbers) => {
      plateNumbers.twentyFives = twentyFives;
    });

    const tens = Math.floor(
      (weightToAdd - fortyFives * 45 * 2 - twentyFives * 25 * 2) / (2 * 10)
    );
    setPlateNumbers((plateNumbers) => {
      plateNumbers.tens = tens;
    });

    const fives = Math.floor(
      (weightToAdd -
        fortyFives * 45 * 2 -
        twentyFives * 25 * 2 -
        tens * 10 * 2) /
        (2 * 5)
    );
    setPlateNumbers((plateNumbers) => {
      plateNumbers.fives = fives;
    });

    const twoPointFives = Math.floor(
      (weightToAdd -
        fortyFives * 45 * 2 -
        twentyFives * 25 * 2 -
        tens * 10 * 2 -
        fives * 5 * 2) /
        (2 * 2.5)
    );
    setPlateNumbers((plateNumbers) => {
      plateNumbers.twoPointFives = twoPointFives;
    });
  };

  useEffect(() => {
    barbellPlateCalculator();
  }, [currentWeight, barWeight]);

  return (
    <div className='plate-calc-card-container'>
      <div className='card-header-container'>
        <div className='card-header'>Plate Calculator</div>
        <div className='card-subtitle'>Bar Weight</div>
        <div className='plate-calc-main-content'>
          <input
            type='numeric'
            className='plate-calc-bar-weight'
            value={barWeight}
            onChange={(e) => {
              setBarWeight(Number(e.target.value));
              e.preventDefault();
            }}
          />{' '}
          <span className='plate-calc-bar-weight'>lbs</span>
        </div>
      </div>
      <div className='card-data-container'>
        <FortyFive plateNumber={plateNumbers?.fortyFives} />
        <TwentyFive plateNumber={plateNumbers?.twentyFives} />
        <Ten plateNumber={plateNumbers?.tens} />
        <Five plateNumber={plateNumbers?.fives} />
        <TwoPointFive plateNumber={plateNumbers?.twoPointFives} />
      </div>
    </div>
  );
};

export default PlateCalculatorCard;
