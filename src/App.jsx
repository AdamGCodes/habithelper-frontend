import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

//!---Styles
import styles from './App.module.scss'


//!--- Componants
import NavBar from './components/NavBar/NavBar';
import NavMobile from './components/NavMobile/NavMobile';


//!--- Pages
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
  
import Timer from './pages/Timer/Timer';
import HabitHelper from './pages/HabitHelper/HabitHelper';
import Journal from './pages/Journal/Journal';

//!--- Utils
import {getUser, removeToken } from './utils/auth'
import JournalNew from './pages/JournalNew/JournalNew';
import JournalShow from './components/JournalShow/JournalShow';
import JournalEdit from './components/JournalEdit/JournalEdit';


const App = () => {
//!---Setting States
const [user, setUser] = useState(getUser())

//!---Location variables
const navigate = useNavigate()

//!---Handlers
const handleSignOut = () => {
  removeToken()
  setUser(null)
  navigate('/signin')
}

  return(
    <>
      <main className={styles.appWrapper}>
        <header className={styles.fullWidthHeader}>
          <NavBar user={user} handleSignOut={handleSignOut} />
        </header>
        <section className={styles.appSection}>
          <Routes>
            { user 
              ?(
                <>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/timers/" element={<Timer/>} />
                  <Route path="/timers/:timersId" element={<Timer /> } />
                  

                  <Route path="/habit-helpers/" element={<HabitHelper user={user} />} />
                  
                  <Route path="/journals/" element={<Journal />} />
                  <Route path="/journals/new" element={<JournalNew />} />
                  <Route path="/journals/:journalId" element={<JournalShow />} />
                  <Route path="/journals/:journalId/edit" element={<JournalEdit />} />
                </>
              )
              : (
                <>
                  <Route path="/" element={<Landing />} />
                  <Route path="/sign-up/" element={<SignUp setUser={setUser} />} />
                  <Route path="/sign-in/" element={<SignIn setUser={setUser} />} />
                </>
              )
            }
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </section>
        <footer className={styles.footerNav}>    
          <NavMobile/>
        </footer>
      </main>
    </>
  )
};

export default App;
