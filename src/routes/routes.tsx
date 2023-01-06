import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../components';
import { LogIn, SignUp } from '../components/Authentication';
import CreateLift from '../components/CreateLift/CreateLift';
import { Exercise } from '../components/Exercise';
import { LiftHistory } from '../components/LiftHistory';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/exercise',
        element: <Exercise />,
      },
      {
        path: '/add-to-plan',
        element: <CreateLift />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: 'lift-history',
        element: <LiftHistory />,
      },
    ],
  },
]);
