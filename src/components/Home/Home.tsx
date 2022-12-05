import React from 'react';
import { motion } from 'framer-motion';
import { contentFade } from '../../animations/index';

import './home.scss';

const Home = () => {
  return (
    <motion.div {...contentFade} className='main-content-container'>
      I am Home
    </motion.div>
  );
};

export default Home;
