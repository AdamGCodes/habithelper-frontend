import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


//!---Styles
import styles from './JournalIndex.module.scss'

//!---Services
import { index } from '../../services/journalService.js'

//!--- Componants


const JournalIndex = () => {

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
    }, [])
    console.log(journals)

    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
    };

    return (
        <main>
            <section>
                <h1>The list of journals</h1>
                <ul>
                    {journals.map((journal) => (
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