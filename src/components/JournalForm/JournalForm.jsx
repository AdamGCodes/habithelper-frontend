import { useEffect, useState, useSyncExternalStore } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


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

    // useEffect(() => {
    //     const fetchJournal = async () => {
    //         try {
    //             const { data } = await show(journalId)
    //             setFormData(data)
    //         } catch(error){
    //             console.log(error)
    //         }
    //     }
    //     if (journalId) fetchJournal()
    // }, [journalId])

    //!---Handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

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
        
        } catch(error){
            console.log(error.response.data)
            setErrors(error.response.data || {});
        }
    }

    return (
        <main>
            <section className={styles.journalFormSection}>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="Text"><h1>{journalId ? "Update your journal entry." : "What's on your mind?"}</h1></label>
                    <textarea 
                    name="text"
                    id="text"
                    rows={4}
                    cols={38}
                    value={ formData.text }
                    onChange={ (e) =>
                        setFormData({...formData, [e.target.name]: e.target.value})
                    }
                    />
                    {errors.text && <p className='error'>{errors.text.message}</p>}

                    <button type='submit'>{journalId ? 'Update' : 'Submit'} Journal Entry</button>
                </form>
            </section>
        </main>
    )
}

export default JournalForm