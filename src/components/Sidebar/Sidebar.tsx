import React, { useState } from 'react';
import {
  IconChart,
  IconChat,
  IconCheck,
  IconFlame,
  IconHead,
  IconSettings,
} from '../../assets';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header-container'>
        <IconFlame />
      </div>
      <div className='sidebar-nav-container'>
        <IconChart />
        <IconCheck />
        <IconChat />
        <IconHead />
        <IconSettings />
      </div>
    </div>
  );
};

export default Sidebar;
