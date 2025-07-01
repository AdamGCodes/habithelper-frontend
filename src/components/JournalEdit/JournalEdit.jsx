import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { index } from '../../services/journalService';
import JournalForm from '../../components/JournalForm/JournalForm';

const JournalEdit = () => {
    const [journals, setJournals] = useState([]);
    const { journalId } = useParams();

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const { data } = await index();
                setJournals(data);
            } catch (err) {
                console.error('Failed to load journals:', err);
            }
        };

        fetchJournals();
    }, []);

    return (
        <JournalForm setJournals={setJournals} />
    );
};

export default JournalEdit;
