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
const Journal = ({ user }) => {

    const [journals, setJournals] = useState([])

    return (
        <main>
            <h1>Your Journals</h1>
            <JournalIndex/>
        </main>
    )
};


export default Journal