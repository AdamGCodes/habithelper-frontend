import { useEffect, useState, useSyncExternalStore } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


//!---Styles
import styles from './JournalForm.module.scss'

//!---Services
import { create, show, update } from '../../services/journalService'


const JournalForm = () => {
    //!---States
    const [formData, setFormData] = useState({
        text: '',
    })

    const [errors, setErrors] = useState({})

    //!---Location Variables

    const navigate = useNavigate()
    const { journalId } = useParams()

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const { data } = await show(journalId)
                setFormData(data)
            } catch(error){
                console.log(error)
            }
        }
        if (journalId) fetchJournal()
    }, [journalId])

    //!---Handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            let res
            if (journalId) {
                res = await update(journalId, formData)
            } else {
                res = await create(formData) 
            }
            console.log('Response:', res)
            console.log('Response Data', res.data);
            setFormData({text: '' });
            
            setJournals((prevTimers) =>
                prevTimers.map((timer) =>
                    timer.id === id ? { ...timer, ...updatedTimer } : timer
                )
            );
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
                    onChange={ handleChange }
                    />
                    {errors.text && <p className='error'>{errors.text.message}</p>}
                
                    {/* Form Error Message */}
                    {errors.errorMessage && <p className="error">{errors.errorMessage}</p>}

                    <button type='submit'>{journalId ? 'Update' : 'Submit'} Journal Entry</button>
                </form>
            </section>
        </main>
    )
}

export default JournalForm