import { animate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { CounterProps } from '../../../types';
import './counter.scss';

const Counter = ({ starting, ending, ...props }: CounterProps) => {
  const [value, setValue] = useState(starting);

  useEffect(() => {
    const controls = animate(starting, ending, {
      duration: 1,
      onUpdate(value) {
        const newValue = Number(value.toFixed(0));
        // console.log(newValue);
        setValue(newValue);
      },
    });
    return () => controls.stop();
  }, [starting, ending]);
  return <div className='counter-container'>{value.toLocaleString()}</div>;
};

export default Counter;
