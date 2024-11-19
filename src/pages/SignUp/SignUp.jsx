//!---Modules/Libraries
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

//!---Styles
import styles from './SignUp.module.scss'

//!---Services
import { signup } from '../../services/userService'

//!---Componants
import Errors from '../../components/Errors/Errors'


const SignUp = ({ setUser }) => {
    //!--- States
    //Form Data State
    const[formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: ''
    })
    
    //Error State
    const [errors, setErrors] = useState('')

    //!---Location variables
    const navigate = useNavigate()

    //!---Event Hndlers
    //Handle Form Changes
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    //Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { user } = await signup(formData) // sign in 
            setUser(user) // set user to state
            navigate('/') // take user back to dashboard
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <section>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
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
                        <label htmlFor="password_confirmation">Confirm Password:</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="first_name">First name:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="last_name">First name:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange} />
                    </div>
                    <Errors message = { errors }/>
                    <div>
                        <button>Sign Up</button>
                        <Link to="/">
                            <button>Cancel</button>
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default SignUp