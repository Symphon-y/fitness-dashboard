import React from 'react';
import './authentication.scss';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LogIn = () => {
  // State
  const { setUser } = useUserContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Navigate Hook
  const navigate = useNavigate();

  // Handle Log In
  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userInfo = userCredential.user;
        fetch(`/${userInfo.uid}`)
          .then(async (res) => {
            const response = await res.json();
            const username = response.username;
            // Set User to use context
            setUser({ id: userInfo.uid, username: username });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // Navigate Home
            navigate('/');
          });
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
      <div className='auth-form-header'>Log In!</div>
      <form
        className='auth-form-main-content'
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}>
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

export default LogIn;
