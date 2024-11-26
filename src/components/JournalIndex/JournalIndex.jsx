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


const JournalIndex = ({ limit }) => {

    //!---States
    const [journals, setJournals] = useState([])
    

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const { data } = await index()
                setJournals(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJournals()
        console.log(journals)
    }, [])
    

    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return "Entry for: " + format(new Date(dateString), "do MMM yy") //@ h:mm a");
    };
    
    //!---Set props for how many entries to show
    const journalsToShow = limit ? journals.slice(-limit) : journals;

    return (
        <main>
            <section className={styles.journalIndexSection}>
                <ul>
                    {journalsToShow.reverse().map((journal) => (
                        <Link key={journal.id} to={`/journals/${journal.id}/`}>
                            <li>
                                <span>{formatDate(journal.created_at)}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </section>
        </main>
    )}

    export default JournalIndex;