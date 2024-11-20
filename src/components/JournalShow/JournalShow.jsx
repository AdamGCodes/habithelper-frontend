import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'


//!---Styles
import styles from './JournalShow.module.scss'

//!---Services
import { show, deleteJournal } from '../../services/journalService'

//!--- Componants


const JournalShow = () => {
    //!---Location Variables
    const { journalId } = useParams();
    const navigate = useNavigate();
    
    //!---States
    const [journal, setJournal] = useState(null)

    const fetchJournal = useCallback(async () => {
        try {
            const { data } = await show(journalId);
            console.log(data)
            setJournal(data)
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }, [journalId])

    useEffect(() => {
        fetchJournal();
    }, [fetchJournal]);
    // console.log(journal)

    //!---Handlers
    const handleDeleteJournal = async () => {
        try {
            await deleteJournal(journalId)
            navigate('/journals')
        } catch(error) { 
            console.log(error)
        }
    };

    //!---Handle formatting dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), "h:mm 'on' d MMM, yyyy");
    };

    if (!journal) {
        return <p>Loading journal...</p>;
    }

    return (
        <main>
            <section>
                <h1>Journal Entry:</h1>
                <h2>{formatDate(journal.created_at)}</h2>
                <p>{journal.text}</p>
                <button onClick={handleDeleteJournal}>Delete</button>
                <Link to={`/journals/${journalId}/edit`}>Edit</Link>
            </section>
        </main>
    )
}

export default JournalShow;