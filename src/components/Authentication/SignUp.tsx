import React, { useState } from 'react';
import './authentication.scss';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../../context';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useUserContext();
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userInfo = userCredential.user;
        setUser({ ...user, id: userInfo.uid });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className='auth-form-container'>
      <div className='auth-form-header'>Create an Account!</div>
      <form
        className='auth-form-main-content'
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}>
        <div className='auth-input-container'>
          <div className='auth-input-label'>Username</div>
          <input
            className='auth-form-input'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='auth-input-container'>
          <div className='auth-input-label'>Email</div>
          <input
            className='auth-form-input'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='auth-input-container'>
          <div className='auth-input-label'>Password</div>
          <input
            className='auth-form-input'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='auth-form-footer'>
          <button className='auth-form-btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
