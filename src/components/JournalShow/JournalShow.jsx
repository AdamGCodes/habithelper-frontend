import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { FaTrashAlt, FaEdit, FaBookOpen } from 'react-icons/fa';

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
        <section className={styles.journalShowSection}>
            <div className={styles.card}>
                <h1>Journal Entry</h1>
                <h2>{formatDate(journal.created_at)}</h2>
                <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: journal.text }}
                />


                <div className={styles.actions}>
                    <button
                        className={styles.danger}
                        onClick={handleDeleteJournal}
                        title="<<Delete journal entry>>"
                        aria-label="Delete journal entry">
                        <FaTrashAlt />
                    </button>

                    <Link
                        to="/journals"
                        className={styles.iconButton}
                        title="<<Back to Your Journal List>>"
                        aria-label="Back to Your Journal List"
                    >
                        <FaBookOpen />
                    </Link>

                    <Link to={`/journals/${journalId}/edit`} 
                        title="<<Edit journal entry>>"
                        aria-label="Edit journal entry"
                    >
                        <FaEdit />
                    </Link>
                </div>
            </div>
        </section>
    )      
}

export default JournalShow;