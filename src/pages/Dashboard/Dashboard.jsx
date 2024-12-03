import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'



//!---Styles
import styles from './Dashboard.module.scss'

//!---Services
import { index as fetchJournalsFromAPI } from '../../services/timerService'

//!---Componants
import TimerWidgit from "../../components/TimerWidgit/TimerWidgit";
import TimerIndex from '../../components/TimerIndex/TimerIndex';
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay';
import JournalIndex from '../../components/JournalIndex/JournalIndex';
import JournalForm from '../../components/JournalForm/JournalForm';


const Dashboard = ({ user, journalsToDisplay }) => {

    const [timers, setTimers] = useState([])
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const { data } = await fetchJournalsFromAPI();
                console.log("Fetched journals:", data);
                setJournals(data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchJournals()
        console.log(journals)
    }, []);

    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return "Entry for: " + format(new Date(dateString), "do MMM yy") //@ h:mm a");
    };

    // if (!journals) {
    //     return <p>Loading journal...</p>;
    // }
    // if (!timers) {
    //     return <p>Loading journal...</p>;
    // }
    
    console.log("Dashboard journals state before passing", journals)
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
                    <JournalForm setJournals = {setJournals}/>
                    
                    <JournalIndex limit={3} journals={journals}/>
                </div>
                <div className={styles.helpersDiv}>
                    <h2>HabitHelpers</h2>
                </div>
            </section>
        </main>
    )
}


export default Dashboard