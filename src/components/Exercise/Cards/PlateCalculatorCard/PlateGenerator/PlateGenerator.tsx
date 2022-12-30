import React from 'react';

interface CircleProps {
  style: {};
}

const PlateGenerator: React.FunctionComponent<CircleProps> = ({
  style,
  ...props
}: any) => {
  return (
    <svg>
      <path
        {...props}
        {...style}
        d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z'
      />
    </svg>
  );
};

export default PlateGenerator;
