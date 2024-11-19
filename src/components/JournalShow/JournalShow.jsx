import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { format } from 'date-fns'


//!---Styles
import styles from './JournalShow.module.scss'

//!---Services
import { show, create, update, deleteJournal } from '../../services/journalService.js'

//!--- Componants


const JournalShow = ({ user }) => {
    //!---States
    const [journal, setJournal] = useState(null)

    //!---Location Variables
    const { journalId } = useParams()
    const navigate = useNavigate()

    const fetchJournal = useCallback(async () => {
        try {
            const { data } = await show(journalId)
            setJournal(data)
        } catch (error) {
            console.log(error.response.data)
        }
    }, [journalId])

    useEffect(() => {
        fetchJournal()
    }, [journalId, fetchJournal])
    console.log(journal)

    //!---Handlers
    const handleDeleteJournal = async () => {
        try {
            await deleteJournal(journalId)
            navigate('/journals')
        } catch(error) { 
            console.log(error)
        }
    }
    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
    };

    return (
        <main>
            <h1>Journal Entry: {formatDate(journal.created_at)} </h1>
            <section>
                <p>{journal.text}</p>
            </section>
        </main>
    )
}

export default JournalShow;