import { FaClock, FaBook, FaCheck } from 'react-icons/fa';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
    const name =
        user.first_name && user.first_name.trim().length > 0
            ? user.first_name
            : user.username;
    return (
        <section className={styles.homeSection}>
            <div className={styles.frostedWrapper}>
                <h1 className={styles.welcome}>Welcome, {name}!</h1>

                <div className={styles.quoteBox}>
                    <p className={styles.quote}>
                        "Discipline is choosing between what you want now and what you want most."
                    </p>
                </div>

                <div className={styles.actions}>
                    <Link to="/timers" className={styles.actionTile}>
                        <FaClock size={32} className={styles.icon} />
                        <span>Timers</span>
                    </Link>

                    <Link to="/journals" className={styles.actionTile}>
                        <FaBook size={32} className={styles.icon} />
                        <span>Journal</span>
                    </Link>

                    <Link to="/helpers" className={styles.actionTile}>
                        <FaCheck size={32} className={styles.icon} />
                        <span>HabitHelpers</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
