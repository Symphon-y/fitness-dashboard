import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { IconAlert, IconFlame, IconProfile } from '../../assets';
import './header.scss';

const Header = () => {
  // Routing hook for navigation
  const navigate = useNavigate();

  // Routing hook to get current location
  const location = useLocation();
  // Sets the selected nav link
  const [selected, setSelected] = useState(location.pathname);

  // Handles nav menu selection for styles
  const handleClick = (e: ChangeEvent) => {
    // Toggle Selection
    selected === e.target.id ? setSelected('') : setSelected('/' + e.target.id);
  };

  // Checks current page and sets selected state
  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <div className='header'>
      <ul className='header-nav-container'>
        <div className='header-nav-item '>
          <IconFlame
            fill={'#EC7E4A'}
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
        <li
          className={
            selected === '/exercise'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='exercise'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/exercise'>
            Exercise
          </NavLink>
          <div className='header-nav-underline' />
        </li>
        <li
          className={
            selected === '/food-plan'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='lift-history'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/lift-history'>
            Lift History
          </NavLink>
          <div className='header-nav-underline' />
        </li>
        <li
          className={
            selected === '/daily-habits'
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
            selected === '/water-intake'
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
        <li
          className={
            selected === '/signup'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='signup'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/signup'>
            Sign Up
          </NavLink>
          <div className='header-nav-underline' />
        </li>
        <li
          className={
            selected === '/login'
              ? 'header-nav-item selected'
              : 'header-nav-item'
          }>
          <NavLink
            id='login'
            onClick={(e: any) => handleClick(e)}
            className='header-nav-link'
            to='/login'>
            Log In
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
