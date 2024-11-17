import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';

//!--- Global Styles
import styles from './App.module.scss'

//!--- Componants


//!--- Pages
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
  
import Timer from './pages/Timer/Timer';
import HabitHelper from './pages/HabitHelper/HabitHelper';
import Journal from './pages/Journal/Journal';

//!--- Utils





const App = () => {
  return(
    <main>
      <h1>APP</h1>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/timers" element={<Timer />} />
        <Route path="/habit-helpers" element={<HabitHelper />} />
        <Route path="/journals" element={<Journal />} />
      </Routes>
    </main>
  )
};

export default App;
