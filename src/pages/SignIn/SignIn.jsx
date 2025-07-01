// ─── Modules/Libraries ─────────────────────────────────────────────
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

// ─── Styles ─────────────────────────────────────────────

import styles from './SignIn.module.scss'

// ─── Services ─────────────────────────────────────────────
import { signin } from '../../services/userService'



const SignIn = ({ setUser }) => {

    const [formData, setFormData] = useState({
        username_or_email: '',
        password: ''
    })


    const [errors, setErrors] = useState("")


    const navigate = useNavigate()

// ─── Handlers ─────────────────────────────────────────────

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const { user } = await signin(formData)
            setUser(user);
            navigate('/');
        } catch (error) {
            const rawMessage =
                error.response?.data?.detail || // DRF default
                error.response?.data?.errorMessage || // fallback key if custom
                "An unknown error occurred. Please try again.";

            const message = //Translating secure backend response to something more user friendly
                rawMessage === "Unauthorized"
                ? "Incorrect username or password."
                : rawMessage;

            setErrors({ general: message });
        }
        
        
    }
    return (
            <section className={styles.signInSection}>
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    {errors.general && (
                        <p className={styles.error} role="alert" aria-live="assertive">
                            {errors.general}
                        </p>
                    )}
                    <div className={styles.formContent}>
                        <div className={styles.formGroup}>
                            <label htmlFor="username_or_email">Username or Email:</label>
                            <input
                                type="text"
                                id="username_or_email"
                                name="username_or_email"
                                autoComplete="username"
                                value={formData.username_or_email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button>Sign In</button>
                        <Link to="/" className={styles.cancelButton}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </section>
    )
}


export default SignIn