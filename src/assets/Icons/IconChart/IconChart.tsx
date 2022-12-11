import React from 'react';
import '../navIcons.scss';

const IconChart = ({ ...props }) => {
  return (
    <div className='sidebar-nav-icon-container'>
      <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M14.5163 0.128117C13.2929 -0.213391 12.1472 0.155788 11.333 0.903941C10.5314 1.6405 10.0464 2.74128 10.0464 3.91907V11.3919C10.0464 12.8067 11.1933 13.9536 12.6081 13.9536H20.0809C21.2587 13.9536 22.3595 13.4686 23.0961 12.667C23.8442 11.8528 24.2134 10.7071 23.8719 9.48365C22.6082 4.95652 19.0435 1.39184 14.5163 0.128117ZM11.7208 3.91907C11.7208 3.19203 12.0223 2.54444 12.4659 2.13689C12.8968 1.74092 13.4549 1.57023 14.0662 1.74086C18.0291 2.84709 21.1529 5.9709 22.2591 9.93384C22.4298 10.5451 22.2591 11.1032 21.8631 11.5341C21.4556 11.9777 20.808 12.2792 20.0809 12.2792H12.6081C12.118 12.2792 11.7208 11.882 11.7208 11.3919V3.91907Z'
          fill='white'
        />
        <path
          d='M8.28528 3.86875C8.72641 3.7302 8.9717 3.26028 8.83315 2.81915C8.6946 2.37802 8.22468 2.13274 7.78355 2.27129C3.27324 3.68789 0 7.90113 0 12.8811C0 19.0219 4.97812 24 11.1189 24C16.0989 24 20.3121 20.7268 21.7287 16.2164C21.8673 15.7753 21.622 15.3054 21.1808 15.1669C20.7397 15.0283 20.2698 15.2736 20.1313 15.7147C18.9275 19.5472 15.3466 22.3256 11.1189 22.3256C5.90286 22.3256 1.6744 18.0971 1.6744 12.8811C1.6744 8.65339 4.45278 5.07247 8.28528 3.86875Z'
          fill='white'
        />
      </svg>
    </div>
  );
};

export default IconChart;