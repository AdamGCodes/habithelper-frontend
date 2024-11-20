import { useEffect, useState } from 'react'
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
            navigate(`/journals/${res.data.id}`)
        } catch(error){
            console.log(error.response.data)
            setErrors(error.response.data)
        }
    }

    return (
        <main>
            <section>
                <form onSubmit={handleSubmit}>
                    <h1>{ journalId ? "Update your journal entry." : "What's on your mind?"}</h1>
                    <label htmlFor="Text">Take take some time to think about your day connect the events of the day to how they made you feel? What went well, what can you do better tomorrow. And what one thing are you greatful for today?</label>
                    <input 
                    type="text"
                    name="text"
                    id="text"
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