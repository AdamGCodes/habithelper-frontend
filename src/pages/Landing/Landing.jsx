//!---Modules/Libraries
import { useState } from "react";
import { Link } from 'react-router-dom'

//!---Styles
import styles from './Landing.module.scss'
//!---Services
//!---ADDING ALL DELETE AS REQUIRED
// import { index } from '../../services/timerService' DON'T THINK IS NEEDED AT ALL

//!---Componants


const Landing = () => {

    return (
        
        <main>
            <section>
                <h1>Welcome To HabitHelper</h1>
                <h2>“Quality is not an act, it is a habit.”</h2>
                <p>
                    We all have habits we know do not serve us well and we all aspire to form good 
                    habits.
                </p>
                <p>
                    HabitHelper has been created to help you form better habits and help you move 
                    towards the person you wish to be.
                </p>
                <div className={styles.landingPageButtons}>
                    <Link to="/sign-up/"><a>Sign Up</a></Link>
                    <Link to="/sign-in/"><a>Sign In</a></Link>
                </div>
            </section>
        </main>
    )
}


export default Landing