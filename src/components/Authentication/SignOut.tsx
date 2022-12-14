import React from 'react';
import './authentication.scss';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const SignOut = () => {
  const app = initializeApp(firebaseConfig);

  return <div></div>;
};

export default SignOut;
