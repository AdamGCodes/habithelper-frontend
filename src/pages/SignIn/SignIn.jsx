//!---Modules/Libraries
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

//!---Styles
import styles from './SignIn.module.scss'

//!---Services
import { signin } from '../../services/userService'

//!---Componants


const SignIn = ({ setUser }) => {

    //!--- State
    const [formData, setFormData] = useState({
        username_or_email: '',
        password: ''
    })

    //!---Location variables
    const navigate = useNavigate()

    //!---Event Handdlers
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const { user } = await signin(formData)
            setUser(user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <main className={styles.signInMain}>
            <section className={styles.signInSection}>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username_or_email">Username or Email:</label>
                        <input
                            type="text"
                            id="username_or_email"
                            name="username_or_email"
                            value={formData.username_or_email}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <button>Sign In</button>
                        <Link to="/">
                            <button>Cancel</button>
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    )
}


export default SignIn