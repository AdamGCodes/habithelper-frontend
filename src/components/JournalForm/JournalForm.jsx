import 'react-quill/dist/quill.snow.css';
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import { FaSave, FaTimes } from 'react-icons/fa';




//!---Styles
import styles from './JournalForm.module.scss'


//!---Services
import { create, show, update } from '../../services/journalService'


const JournalForm = ( { setJournals }) => {
    //!---States
    const [formData, setFormData] = useState({
        text: '',
    })

    const [errors, setErrors] = useState({})

    //!---Location Variables
    const { journalId } = useParams()

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const { data } = await show(journalId);
                setFormData({ text: data.text });
            } catch (error) {
                console.log('Error loading journal:', error);
            }
        };

        if (journalId) fetchJournal();
    }, [journalId]);

    //!---Handlers

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = journalId
            ? await update(journalId, formData)
            : await create(formData);

            if (!journalId) {
                setJournals((prevJournals) => [...prevJournals, response.data])
            } else {
                setJournals((prevJournals)=>
                    prevJournals.map((journal) =>
                        journal.id === journalId ? response.data : journal
                    )
                );
            }
            setFormData({text: '' });
        
        } catch (error) {
            console.log(error.response?.data || error);
            if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' });
            }
        }
    }

    return (
        <section className={styles.journalFormSection}>

            <form onSubmit={handleSubmit}>
                
                <label htmlFor="Text"><h1>{journalId ? "Update Your Entry" : "What's on your mind?"}</h1></label>
                <ReactQuill
                    theme="snow"
                    value={formData.text}
                    onChange={(value) => setFormData({ ...formData, text: value })}
                />
                {errors.text && <p className={styles.error}>{errors.text[0]}</p>}
                {errors.general && <p className={styles.generalError}>{errors.general}</p>}

                <div className={styles.actionRow}>

                    <button
                        type="submit"
                        title={journalId ? '<<Save Update>>' : '<<Submit Journal Entry>>'}
                        aria-label={journalId ? 'Save Update' : 'Submit Journal Entry'}
                        className={styles.iconButton}
                    >
                        <FaSave />
                    </button>

                    {journalId && (//Conditionally rendering cancel button only on edit
                        <button
                            type="button"
                            onClick={() => navigate('/timers')}
                            title="<<Cancel Update>>"
                            aria-label="Cancel Update"
                            className={`${styles.iconButton} ${styles.danger}`}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </form>
        </section>
    )
}

export default JournalForm