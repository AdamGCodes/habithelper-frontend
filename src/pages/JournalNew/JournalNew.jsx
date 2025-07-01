import { useSearchParams } from 'react-router-dom';
import JournalForm from '../../components/JournalForm/JournalForm';

const JournalNew = () => {
    const [params] = useSearchParams();
    const date = params.get('date'); // format: YYYY-MM-DD

    return (
        <section>
            <JournalForm selectedDate={date} />
        </section>
    );
};

export default JournalNew;
