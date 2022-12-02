import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconAlert, IconProfile } from '../../assets';
import './header.scss';

const Header = () => {
  // Sets the selected nav link
  const [selected, setSelected] = useState('');

  // Handles nav menu selection for styles
  const handleClick = (e: ChangeEvent) => {
    // Toggle Selection
    selected === e.target.id ? setSelected('') : setSelected(e.target.id);
  };

  return (
    <div className='header'>
      <ul className='header-nav-container'>
        <li
          className={
            selected === 'exercise'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='exercise'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/'>
            Exercise
          </NavLink>
          <div className='header-nav-underline' />
        </li>
        <li
          className={
            selected === 'food-plan'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='food-plan'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/'>
            Food Plan
          </NavLink>
          <div className='header-nav-underline' />
        </li>
        <li
          className={
            selected === 'daily-habits'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='daily-habits'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/'>
            Daily Habits
          </NavLink>
          <div className='header-nav-underline' />
        </li>
        <li
          className={
            selected === 'water-intake'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='water-intake'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/'>
            Water Intake
          </NavLink>
          <div className='header-nav-underline' />
        </li>
      </ul>
      <div className='header-profile-container'>
        <IconAlert />
        <IconProfile />
      </div>
    </div>
  );
};

export default Header;
