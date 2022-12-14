import React from 'react';
import './authentication.scss';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../../context';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = useUserContext();
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userInfo = userCredential.user;
        setUser({ id: userInfo.uid, name: 'Logged In!' });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit();
        e.preventDefault();
      }}>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        className='signup-email'
      />
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        className='signup-password'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default SignUp;
