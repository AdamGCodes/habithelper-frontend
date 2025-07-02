import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './JournalIndex.module.scss';
import { index } from '../../services/journalService';
import SiteModal from "../SiteModal/SiteModal";
import { FaCheck, FaTimes } from 'react-icons/fa';

const JournalIndex = () => {
    const [journals, setJournals] = useState([]);
    const [journalDateSet, setJournalDateSet] = useState(new Set());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [showPrompt, setShowPrompt] = useState(false);
    const [pendingDate, setPendingDate] = useState(null);


    
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const { data } = await index();
                setJournals(data);

                const dates = new Set(data.map(j => j.entry_date));

                setJournalDateSet(dates);
            } catch (error) {
                console.error('Failed to load journals:', error);
            }
        };

        fetchJournals();
    }, []);
// Handles Clicks on calendar dates. Create/Read/Update/Delete
    const handleDayClick = (date) => { 
        const dateStr = date.toISOString().slice(0, 10);
        const match = journals.find(j => j.entry_date === dateStr);

        if (match) {
            navigate(`/journals/${match.id}`);
        } else {
            setPendingDate(dateStr);
            setShowPrompt(true);
        }
    };
// Handles returning user to a view of todays date in calendar. 
    const handleGoToToday = () => {
        const today = new Date();
        setSelectedDate(today);        // highlights today
        setActiveStartDate(today);     // scrolls to today’s month
    };      


    return (
        <section className={styles.journalIndexSection}>
            {/* Modal prompt for calendar clicks */}
            {showPrompt && (
                <SiteModal onClose={() => setShowPrompt(false)}>
                    <h2>No journal entry for {pendingDate}</h2>
                    <p>Would you like to create one?</p>

                    <div className={styles.modalActions}>
                        <button
                            className={styles.safeButton}
                            onClick={() => navigate(`/journals/new?date=${pendingDate}`)}
                            title="Create entry"
                            aria-label="Create entry"
                        >
                            <FaCheck />
                        </button>
                        <button
                            className={styles.dangerButton}
                            onClick={() => setShowPrompt(false)}
                            title="Cancel"
                            aria-label="Cancel"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </SiteModal>
            )}


            <h1>Add, View, Edit or Delete Journal Entries</h1>
            {/* Imported calendar with use of react-calendar */}
            <p className={styles.helperText}>
                Click a day to view or create a journal entry.
            </p>
            <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                activeStartDate={activeStartDate}
                onActiveStartDateChange={({ activeStartDate }) =>
                    setActiveStartDate(activeStartDate)
                }
                onClickDay={handleDayClick}
                tileClassName={({ date }) =>
                    journalDateSet.has(date.toISOString().slice(0, 10)) ? styles.hasEntry : null
                }
            />

            <button
                className={styles.todayButton}
                onClick={handleGoToToday}>
                Today
            </button>
        </section>
    );
};

export default JournalIndex;
