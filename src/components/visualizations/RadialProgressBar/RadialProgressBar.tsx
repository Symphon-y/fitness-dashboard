import * as React from 'react';

interface Props {
  progress: number;
  size: number;
  strokeWidth: number;
  bgColor: string;
  fgColor: string;
  startAngle: number;
  endAngle: number;
}

const RadialProgressBar: React.FC<Props> = ({
  progress,
  size,
  strokeWidth,
  bgColor,
  fgColor,
  startAngle,
  endAngle,
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const angleRange = endAngle - startAngle;
  const circumference = (angleRange / 360) * 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const startX = size / 2 + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = size / 2 + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = size / 2 + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = size / 2 + radius * Math.sin((endAngle * Math.PI) / 180);
  const largeArcFlag = angleRange <= 180 ? '0' : '1';

  const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}`;

  return (
    <svg width={'100%'} viewBox='0 0 100 100' fill='none'>
      <path
        d={pathData}
        stroke={fgColor}
        strokeWidth={strokeWidth - 0.5}
        fill='none'
        strokeDasharray={circumference}
      />
      <path
        d={pathData}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill='none'
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
};

export default RadialProgressBar;
