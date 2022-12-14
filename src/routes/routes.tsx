import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../components';
import { LogIn, SignUp } from '../components/Authentication';
import { Exercise } from '../components/Exercise';

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
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
    ],
  },
]);
