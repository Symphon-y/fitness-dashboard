import React, { useState, useEffect } from 'react';
import { IconFlame } from '../../../../../../assets';
import './countDown.scss';
import '../../../cards.scss';
import { RadialProgressbar } from '../../../../../visualizations';
interface CountDownProps {
  // The number of seconds to countdown from
  initialTime: number;
  setNeedsTimer: (value: boolean) => void;
}

const CountDown: React.FC<CountDownProps> = ({
  initialTime,
  setNeedsTimer,
}) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    if (time === 0) {
      setNeedsTimer(false);
    }
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  // Calculate the percentage of the initial time that has elapsed
  const elapsedPercentage = (time / initialTime) * 100;
  return (
    <div className='counterdown-timer-container'>
      <div className='countdown-header-container'>
        <div className='countdown-header'>Rest</div>
        <div className='countdown-subtitle'>{time} seconds</div>
      </div>
      <div className='countdown-timer'>
        <RadialProgressbar
          progress={elapsedPercentage}
          size={100}
          strokeWidth={15}
          fgColor='#EC7E4A'
          bgColor='#373D41'
          startAngle={0}
          endAngle={180}
        />
      </div>
      <button
        className='countdown-skip-btn'
        onClick={() => {
          setNeedsTimer(false);
        }}>
        Skip
      </button>
    </div>
  );
};

export default CountDown;

/*
<svg width='100' height='100' style={{ transform: 'scale(1.7)' }}>
          <clipPath id='clip0_4_17'>
            <rect width='45' height='49.5465' fill='white' />
          </clipPath>
          <defs>
            <linearGradient id='gradient' gradientTransform='rotate(90)'>
              <stop offset='0%' stopColor='#343639' />
              <stop
                offset={`${elapsedPercentage - 0.001}%`}
                stopColor='#343639'
              />
              <stop offset={`${elapsedPercentage}%`} stopColor='#EC7E4A' />
              <stop offset='100%' stopColor='#EC7E4A' />
            </linearGradient>
          </defs>
          <g clip-path='url(#clip0_4_17)' style={{ transform: 'scale(2)' }}>
            <path
              fill='url(#gradient)'
              d='M34.9173 15.8623C34.6176 15.5416 34.1971 15.3958 33.7856 15.4703C33.3733 15.5446 33.0172 15.8295 32.826 16.2385C32.1682 17.6454 31.3327 18.9384 30.3497 20.0814C30.4477 19.2557 30.497 18.4251 30.497 17.5923C30.497 15.9943 30.3025 14.3499 29.9187 12.7041C28.6568 7.29845 25.3477 2.72691 20.8402 0.161809C20.4478 -0.0614403 19.9802 -0.0536019 19.5941 0.182712C19.208 0.419122 18.9552 0.852558 18.9205 1.33738C18.5691 6.24984 16.271 10.7191 12.6118 13.6021C12.5634 13.6405 12.5153 13.6794 12.4672 13.7181C12.3677 13.7983 12.2738 13.8742 12.1861 13.9379C12.1724 13.9479 12.1588 13.9582 12.1454 13.9687C9.84406 15.7829 7.94519 18.2012 6.65381 20.9629C5.3416 23.7721 4.67627 26.7866 4.67627 29.9224C4.67627 31.5199 4.87077 33.1643 5.25441 34.8104C7.27897 43.4866 14.3703 49.5462 22.4993 49.5462C32.3265 49.5462 40.3214 40.7429 40.3214 29.9224C40.3214 24.5865 38.4022 19.5931 34.9173 15.8623Z'
            />

            <ellipse
              cx='21.819'
              cy='30.0282'
              rx='5.45455'
              ry='6.00564'
              fill='#FCFBFF'
            />
          </g>
        </svg>
*/
