import { useState, useEffect } from "react";

// import { format, setMinutes } from 'date-fns'


//!---Styles
import styles from './TimerIndex.module.scss'

//!---Services
import { index, deleteTimer, update } from '../../services/timerService'

//!--- Componants
import TimerWidgit from "../TimerWidgit/TimerWidgit";


const TimerIndex = () => {

    //!---States
    const [timers, setTimers] = useState([])

    const startDate = new Date('2024-11-15T15:24:30Z');
    const Now_IN_MS = new Date().getTime();
    const dateTimeSinceStart = startDate + Now_IN_MS;

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
    }, [])

    //!---Handlers
    const handleDeleteTimer = async (id) => {
        try {
            console.log("Deleting timer with ID:", id)
            await deleteTimer(id)
            setTimers((prevTimers) => {
                console.log("Timers beofre filtering:", prevTimers)
                const updatedTimers = prevTimers.filter((timer) => timer.id !==id);
                console.log("Timers after filtering:", updatedTimers)
                return updatedTimers;
            })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <main>
            <section className={styles.timerSection}>
                <ul>
                    <h1>My Temperance Timers</h1>
                    {timers.length > 0 ? (
                    timers.map((timer) => (
                        <li key={timer.id}>
                            <div className={styles.timerDiv}>
                                <div className={styles.timerDisplayGroup}>
                                    <h2>{(timer.name)}</h2>
                                    <p><small>{(timer.reason)}</small></p>
                                    <TimerWidgit startDate={(timer.created_at)} />
                                </div>
                                <button className={styles.delBtn} onClick={() => handleDeleteTimer(timer.id)}>X</button>
                                <button className={styles.rstBtn} onClick={() => handleDeleteTimer(timer.id)}></button>
                            </div>
                        </li>
                        ))
                    ) : (
                        <p>No timers found.</p>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default TimerIndex;


// !---Handle formatting dates
// const formatDate = (dateString) => {
//     return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
// };
