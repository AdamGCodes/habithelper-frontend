import {
    NavLink
}

    from 'react-router-dom';

import {
    FaHome,
    FaBook,
    FaClock,
    FaCheck
}

    from 'react-icons/fa';
import styles from './NavMobile.module.scss';

const NavMobile = () => {
    return (<nav className={
        styles.navMobile
    }

        aria-label="Mobile navigation" > <NavLink to="/" aria-label="Home" > <FaHome /> </NavLink> <NavLink to="/journals" aria-label="Journal" > <FaBook /> </NavLink> <NavLink to="/timers" aria-label="Timers" > <FaClock /> </NavLink> <NavLink to="/habit-helpers" aria-label="HabitHelpers" > <FaCheck /> </NavLink> </nav>);
}

    ;

export default NavMobile;