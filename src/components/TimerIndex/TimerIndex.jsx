import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom';

// import { format, setMinutes } from 'date-fns'

//!--- Componants
import SiteModal from "../SiteModal/SiteModal";
import TimerWidgit from "../TimerWidgit/TimerWidgit";
import TimerForm from "../TimerForm/TimerForm";

//!---Styles
import styles from './TimerIndex.module.scss'

//!---Services
import { index, deleteTimer, update } from '../../services/timerService'





const TimerIndex = () => {

    //!---States
    const [timers, setTimers] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState("")


    const startDate = new Date('2024-11-15T15:24:30Z');
    const Now_IN_MS = new Date().getTime();
    const dateTimeSinceStart = startDate + Now_IN_MS;
    

    useEffect(() => {
        const fetchTimers = async () => {
            try {
                const { data } = await index()
                setTimers(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTimers()
    }, [])

    //!---Handlers
    //Handle Delete
    const handleDeleteTimer = async (id) => {
        try {
            console.log("Deleting timer with ID:", id)
            await deleteTimer(id)
            setTimers((prevTimers) => {
                console.log("Timers beofre filtering:", prevTimers)
                const updatedTimers = prevTimers.filter((timer) => timer.id !==id);
                console.log("Timers after filtering:", updatedTimers)
                return updatedTimers;
            })
        } catch (error) {
            console.log(error)
        }};
    
    //Handle Restart timer
    const handleRestartTimer = async (id) => {
        try {
            console.log("Restarting timer id:", id)

            const formData = { started: new Date().toISOString(),}
            const { data: updatedTimer } = await update(id, formData);

            setTimers((prevTimers) =>
                prevTimers.map((timer) =>
                    timer.id === id ? {...timer, ...updatedTimer } : timer
                )
            );
        } catch(error){
            console.log("Error restarting timer", error);
        }};
    
        //Handle Modal Buttons
        const handleButtonClick =(value) => {
            setModalOpen(false)
            setMessage(value);
        }

    return (
        <main>
            <section className={styles.timerSection}>
                {modalOpen && (
                // createPortal( 
                <SiteModal onSubmit={handleButtonClick} onCancel={handleButtonClick} onClose={handleButtonClick}>
                    <TimerForm timers = {timers}/>
                </SiteModal>
                // ,document.body
                    // 
                    )}
                <ul>
                    <h1>My Temperance Timers</h1>
                    <button className={styles.ModalOpenBtn} onClick={() => setModalOpen(true)}>Create A New Timer</button>
                    {timers.length > 0 ? (
                    timers.map((timer) => (
                        <li key={timer.id}>
                            <div className={styles.timerDiv}>
                                <div className={styles.timerDisplayGroup}>
                                    <h2>{(timer.name)}</h2>
                                    <p><small>{(timer.reason)}</small></p>
                                    <TimerWidgit startDate={(timer.started)} />
                                </div>
                                <button className={styles.delBtn} onClick={() => handleDeleteTimer(timer.id)}>X</button>
                                <button className={styles.rstBtn} onClick={() => handleRestartTimer(timer.id)}>Rstrt</button>
                            </div>
                        </li>
                        ))
                    ) : (
                        <p>No timers found.</p>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default TimerIndex;


// !---Handle formatting dates
// const formatDate = (dateString) => {
//     return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
// };
