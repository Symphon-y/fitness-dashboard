import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../components';
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
    ],
  },
]);
