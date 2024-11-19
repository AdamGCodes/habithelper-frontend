import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../NavBar/NavBar.module.scss';


const NavBar = ({ user, handleSignOut }) => {
    //!---State
    const [menuOpen, setMenuOpen] = useState(false)
    // const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")

    return(
        <div className={styles.navContainer}>
            <h1>HabitHelper</h1>
            <nav>
                <div
                    className={styles.menu}
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                        console.log("menu clicked!");
                        console.log(menuOpen)
                    }}>
                    <span className={styles.burgerClass}></span>
                    <span className={styles.burgerClass}></span>
                    <span className={styles.burgerClass}></span>
                </div>
                <ul className={menuOpen ? `${styles.open}` : ""}>
                    <li><NavLink to="/">Home</NavLink></li>
                    { user? <>
                        <li><NavLink to="/habit-helpers">HabitHelpers</NavLink></li>
                        <li><NavLink to="/timers">Temperance Timers</NavLink></li>
                        <li><NavLink to="/journals">Journals</NavLink></li>
                        <li><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>

                    </> :
                    <>
                        <li><NavLink to="/sign-in">Sign In</NavLink></li>
                        <li><NavLink to="/sign-up">Sign Up</NavLink></li>
                    </>}

                </ul>
            </nav>
        </div>
    )
}

export default NavBar;