import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TimerForm.module.scss'
import { create, update } from '../../services/timerService'

const TimerForm = ({ timers, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        reason: '',
        started: '',
    })

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const timerId = timers.id

    useEffect(() => {
        const fetchTimer = async () => {
            try {
                const { data } = await show(timerId)
                setFormData(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (timerId) fetchTimer()
    }, [timerId])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: null }) // optional: clear field error on change
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const startedDate = formData.started ? new Date(formData.started) : null

            const formToSend = {
                ...formData,
                started: startedDate ? startedDate.toISOString() : null,
            }

            let res
            if (timerId) {
                res = await update(timerId, formToSend)
            } else {
                res = await create(formToSend)
                onSuccess(res.data)
            }
        } catch (error) {
            console.log('API error:', error.response?.data || error)
            if (error.response?.data) {
                setErrors(error.response.data)
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' })
            }
        }
    }      

    return (
        <section className={styles.timeFormSection}>
            <form onSubmit={handleSubmit}>
                <h1>{timerId ? 'Update your timer info' : 'Create Your Timer'}</h1>

                <label htmlFor="name">
                    Habit Label <span>(Max 25 characters)</span>
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength={25}
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name[0]}</p>}

                <label htmlFor="started">When did you last do the habit?</label>
                <input
                    type="datetime-local"
                    name="started"
                    id="started"
                    step="1"
                    value={formData.started}
                    onChange={handleChange}
                />
                {errors.started && <p className={styles.error}>{errors.started[0]}</p>}

                {errors.general && <p className={styles.generalError}>{errors.general}</p>}

                <button type="submit">{timerId ? 'Update' : 'Create'} Timer</button>
            </form>
        </section>
    )
}

export default TimerForm
