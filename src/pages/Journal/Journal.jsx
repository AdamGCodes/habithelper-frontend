//!---Modules/Libraries
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


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

    return (
        <main>
            <section className={styles.journalSection}>
                    <JournalForm/>
                    <JournalIndex limit = {null} />
            </section>
        </main>
    )
};


export default Journal