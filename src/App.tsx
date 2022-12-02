import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, Sidebar } from './components';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='main-content'>
        <Outlet />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
