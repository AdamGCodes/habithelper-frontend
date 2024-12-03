import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import dayGridPlugin from '@fullcalendar/daygrid'

//!---Styles
import styles from './JournalIndex.module.scss'

//!---Services
import { index } from '../../services/journalService.js'

//!--- Componants
import FullCalendar from '../CalendarView/CalendarView.jsx';


const JournalIndex = ({ journals = [], limit }) => {
    // = [] ensuring that journals is always an array
    console.log("Revieved journals in JournalIndex:", journals)

    //!---Set props for how many entries to show
    const journalsToShow = limit ? journals.slice(-limit) : journals;
    

    // useEffect(() => {
    //     const fetchJournals = async () => {
    //         try {
    //             const { data } = await index()
    //             setJournals(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchJournals()
    //     console.log(journals)
    // }, [])
    

    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return "Entry for: " + format(new Date(dateString), "do MMM yy") //@ h:mm a");
    };

    return (
        <main>
            <section className={styles.journalIndexSection}>
                <ul>
                    {journalsToShow.length > 0 ? (
                        journalsToShow.reverse().map((journal) => (    
                            <li key={journal.id} >
                                <Link to={`/journals/${journal.id}/`}>
                                    <span>{formatDate(journal.created_at)}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No journal entries found.</p>
                    )}
                </ul>
            </section>
        </main>
    )}

    export default JournalIndex;