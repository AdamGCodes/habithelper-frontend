import React, { useState, useEffect } from 'react';





//!---Styles
import styles from './Dashboard.module.scss'

//!---Services
import { index } from '../../services/timerService'

//!---Componants
import TimerWidgit from "../../components/TimerWidgit/TimerWidgit";


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
        <main className={styles.dashboard}>
            <section className={styles.user}>
                <h2>Welcome hi {user.first_name}</h2>
            </section>
            <section className={styles.dashboardTimer}>
                <div>
                    <h2>Your Timers</h2>
                    <ul>
                        {timers.length > 0 ? (
                            timers.map((timer) => (
                                <li key={timer.id}>
                                    <div className={styles.timerDiv}>
                                        <div className={styles.timerDisplayGroup}>
                                            <h2>{(timer.name)}</h2>
                                            <p><small>{(timer.reason)}</small></p>
                                            <small><TimerWidgit startDate={(timer.started)} /></small>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No timers found.</p>
                        )}
                    </ul>
                </div>
            </section>
            <section className={styles.dashboardJournals}>
                <div>
                    <h2>Your Journals</h2>
                </div>
            </section>
            <section className={styles.dashboardHelpers}>   
                <div>
                    <h2>HabitHelpers</h2>
                </div>
            </section>
        </main>
    )
}


export default Dashboard