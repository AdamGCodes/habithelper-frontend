import React, { useState, useEffect } from 'react';





//!---Styles
import styles from './Dashboard.module.scss'

//!---Services
import { index } from '../../services/timerService'

//!---Componants
import TimerWidgit from "../../components/TimerWidgit/TimerWidgit";
import TimerIndex from '../../components/TimerIndex/TimerIndex';
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay';


const Dashboard = ({user}) => {

    const [timers, setTimers] = useState([])
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // if (loading) return <div>Loading...</div>;


    return (
        <main>
            <section className={styles.dashboardSection}>
                <div className={styles.userDiv}>
                    <h2>Welcome {user.first_name}</h2>
                </div>
                <div className={styles.timersDiv}>
                    <h2>Your Timers</h2>
                    <ul>
                        {timers.length > 0 ? (
                            timers.map((timer) => (
                                <li key={timer.id}>
                                    <h2>{(timer.name)}</h2>
                                    <TimerWidgit startDate={(timer.started)} />
                                </li>
                            ))
                        ) : (
                            <p>No timers found.</p>
                        )}
                    </ul>
                </div>
                <div className={styles.journalsDiv}>
                    <h2>Your Journals</h2>
                </div>
                <div className={styles.helpersDiv}>
                    <h2>HabitHelpers</h2>
                </div>
            </section>
        </main>
    )
}


export default Dashboard