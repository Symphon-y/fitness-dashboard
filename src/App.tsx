import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, Sidebar } from './components';

function App() {
  return (
    <div className='App'>
      <Header />

      <div className='main-content'>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
