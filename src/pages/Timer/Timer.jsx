//!---Modules/Libraries
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


//!---Styles
import styles from './Timer.module.scss'

//!---Services
// import { index, show, create, update, deleteJournal } from '../../services/journalService.js'

//!--- Componants
import TimerIndex from '../../components/TimerIndex/TimerIndex.jsx'
// import TimerShow from '../../components/TimerlShow/TimerShow.jsx'
const Timer = () => {

    const [timers, setTimers] = useState([])

    return (
        <main>
            <h1>Your Temperance Timers</h1>
            <TimerIndex />
        </main>
    )
};


export default Timer