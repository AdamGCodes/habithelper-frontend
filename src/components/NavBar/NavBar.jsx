import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import styles from '../NavBar/NavBar.module.scss';


const NavBar = ({ user, handleSignOut }) => {
    //!---State
    const [menuOpen, setMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    // const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")

    return(
        <>
        
        <div className={styles.navContainer}>
            
            <h1>HabitHelper</h1>
            <nav>
                <div className={styles.hamburgerWrapper}>
                    <Hamburger
                        toggled={menuOpen}
                        toggle={setMenuOpen}
                        size={40}
                        direction="right"
                        duration={0.8}
                        distance="lg"
                        rounded
                        onClick={() => setMenuOpen(false)}
                        easing="ease-in"
                    />
                    {/* <div>{menuOpen ? "Open" : "Close"}</div> */}
                </div>
                <ul className={menuOpen ? `${styles.open}` : ""}>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="/">Home</NavLink></li>
                    { user? <>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="/habit-helpers/">HabitHelpers</NavLink></li>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="/journals/">Journals</NavLink></li>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="/timers/">Temperance Timers</NavLink></li>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>

                    </> :
                    <>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="/sign-in/">Sign In</NavLink></li>
                        <li onClick={() => setMenuOpen(false)}><NavLink to="/sign-up/">Sign Up</NavLink></li>
                    </>}

                </ul>
            </nav>
        </div>
        </>
    )
}

export default NavBar;