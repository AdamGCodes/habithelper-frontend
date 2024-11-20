import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { format, setMinutes } from 'date-fns'


//!---Styles
import styles from './TimerIndex.module.scss'

//!---Services
import { index } from '../../services/timerService'

//!--- Componants
import TimerWidgit from "../TimerWidgit/TimerWidgit";

const TimerIndex = () => {

    //!---States
    const [timers, setTimers] = useState([])

    const [seconds, setSeconds]= useState(0)
    const [minutes, setminutes] = useState(0)
    
    

    useEffect(() => {
        const fetchTimers = async () => {
            try {
                const { data } = await index()
                setTimers(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTimers()
        console.log(timers)
    }, [])


    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
    };

    return (
        <main>
            <section className={styles.timerSection}>
                <div className={styles.headingDiv}>
                    <h1>The list of timers</h1>
                    <TimerWidgit></TimerWidgit>
                </div>
                <ul>
                    {timers.map((timer) => (
                        <Link key={timer.id} to={`/timers/${timer.id}/`}>
                            <div className={styles.timerDiv}>
                                

                                <li>
                                    <span>{formatDate(timer.created_at)}</span>
                                </li>
                            </div>
                            
                        </Link>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default TimerIndex;