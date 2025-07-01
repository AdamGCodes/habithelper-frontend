import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './JournalIndex.module.scss';
import { index } from '../../services/journalService';

const JournalIndex = () => {
    const [journals, setJournals] = useState([]);
    const [journalDateSet, setJournalDateSet] = useState(new Set());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const { data } = await index();
                setJournals(data);

                const dates = new Set(
                    data.map(journal => journal.created_at.slice(0, 10)) // 'YYYY-MM-DD'
                );
                setJournalDateSet(dates);
            } catch (error) {
                console.error('Failed to load journals:', error);
            }
        };

        fetchJournals();
    }, []);

    const handleDayClick = (date) => {
        const dateStr = date.toISOString().slice(0, 10);
        const match = journals.find(j => j.created_at.slice(0, 10) === dateStr);

        if (match) {
            navigate(`/journals/${match.id}`);
        } else {
            const confirmCreate = window.confirm(`No journal entry exists for ${dateStr}. Would you like to create one?`);
            if (confirmCreate) {
                navigate(`/journals/new?date=${dateStr}`);
            }
        }
    };

    return (
        <section className={styles.journalIndexSection}>

            <h1>Add, View, Edit or Delete Journal Entries</h1>
            <Calendar
                onClickDay={handleDayClick}
                value={selectedDate}
                onActiveStartDateChange={({ activeStartDate }) => setSelectedDate(activeStartDate)}
                tileClassName={({ date }) =>
                    journalDateSet.has(date.toISOString().slice(0, 10)) ? styles.hasEntry : null
                }
            />

            <button
                className={styles.todayButton}
                onClick={() => setSelectedDate(new Date())}>
                Today
            </button>
        </section>
    );
};

export default JournalIndex;
