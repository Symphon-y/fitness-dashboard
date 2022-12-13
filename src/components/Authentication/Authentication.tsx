import React from 'react';
import './authentication.scss';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const Authentication = () => {
  const app = initializeApp(firebaseConfig);

  return <div></div>;
};

export default Authentication;
