//!---Modules/Libraries
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { index } from '../../services/journalService.js';

//!---Styles
import styles from './Journal.module.scss'

//!---Services
// import { index, show, create, update, deleteJournal } from '../../services/journalService.js'

//!--- Componants
import JournalIndex from '../../components/JournalIndex/JournalIndex.jsx'
import JournalShow from '../../components/JournalShow/JournalShow.jsx'
import JournalForm from '../../components/JournalForm/JournalForm.jsx'

const Journal = ({ user }) => {

    const [journals, setJournals] = useState([])

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const { data } = await index();
                setJournals(data);
            } catch (error) {
                console.log('Error fetching journals:', error);
            }
        };
        fetchJournals();
    }, []);

    return (
        <section className={styles.journalSection}>
            {/* <JournalForm setJournals={setJournals}/> */}
            <div className={styles.journalIndexSection}>
                <JournalIndex journals={journals} limit = {null} />
            </div>
        </section>
    )
};


export default Journal