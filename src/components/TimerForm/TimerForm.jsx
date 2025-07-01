import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DtPicker } from 'react-calendar-datetime-picker'


//!---Styles
import styles from './TimerForm.module.scss'
import 'react-calendar-datetime-picker/dist/style.css'

//!---Services
import { create, update } from '../../services/timerService'


const TimerForm = ({timers, onSuccess}) => {
    //!---States
    const [formData, setFormData] = useState({
        name: '',
        reason:'',
        started:'',
    })

    const [errors, setErrors] = useState({})

    //!---Location Variables
    const navigate = useNavigate()
    const timerId = timers.id
    // const { journalId } = useParams() Don't need this but do need to make sure I'm passing the id from the target

    useEffect(() => {
        const fetchTimer = async () => {
            try {
                const { data } = await show(TimerId)
                setFormData(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (timerId) fetchTimer()
    }, [timerId])

    //!---Handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted");

        try {
            // Convert local datetime string to UTC ISO string
            const formToSend = {
                ...formData,
                started: new Date(formData.started).toISOString(),
            };

            let res;
            if (timerId) {
                res = await update(timerId, formToSend);
            } else {
                res = await create(formToSend);
                onSuccess(res.data); // signal to TimerIndex
            }

        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    };

    return (
        <section className={styles.timeFormSection}>
            <form onSubmit={handleSubmit}>
                <h1>{timerId ? "Update your timer info." : "Create Your Timer"}</h1>
                <label htmlFor="name">What is the habit you want to quit?</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength={25}
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className='error'>{errors.name.message}</p>}

                {/* <label htmlFor="reason">What's motivating you to quit?</label>
                <input
                    type="text"
                    name="reason"
                    id="reason"
                    value={formData.reason}
                    onChange={handleChange}
                />
                {errors.reason && <p className='error'>{errors.reason.message}</p>} */}

                <label htmlFor="started">When did you last do the habit?</label>
                <input
                    type="datetime-local"
                    name="started"
                    id="started"
                    step="1"
                    value={formData.date}
                    onChange={handleChange}
                />
                {errors.started && <p className='error'>{errors.started.message}</p>}

                {/* Form Error Message */}
                {errors.errorMessage && <p className="error">{errors.errorMessage}</p>}

                <button type='submit'>{timerId ? 'Update' : 'Create'} Timer</button>
            </form>
        </section>
    )
}

export default TimerForm