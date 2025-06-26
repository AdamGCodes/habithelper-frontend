import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import styles from './NavBar.module.scss';

const NavBar = ({ user, handleSignOut }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY && currentScrollY > 50) {
                setHidden(true); // scrolling down
            } else {
                setHidden(false); // scrolling up
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    return (
        <header className={`${styles.navSection} ${hidden ? styles.navHidden : ''}`}>
            <nav className={styles.navTopRow}>
                <h1>
                    <Link to="/" aria-label="Go to home page">HabitHelper</Link>
                </h1>

                <div className={styles.hamburgerWrapper}>
                    <Hamburger
                        toggled={menuOpen}
                        toggle={setMenuOpen}
                        size={40}
                        direction="right"
                        duration={0.8}
                        distance="lg"
                        rounded
                    />
                </div>
            </nav>

            <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                <li><NavLink to="/">Home</NavLink></li>
                {user ? (
                    <>
                        <li><NavLink to="/journals/">Journals</NavLink></li>
                        <li><NavLink to="/timers/">Temperance Timers</NavLink></li>
                        <li><NavLink to="" onClick={handleSignOut}>Sign Out</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/sign-in/">Sign In</NavLink></li>
                        <li><NavLink to="/sign-up/">Sign Up</NavLink></li>
                    </>
                )}
            </ul>
        </header>

    );
};

export default NavBar;
