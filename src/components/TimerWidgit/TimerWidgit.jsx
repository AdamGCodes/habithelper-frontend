import { useState, useEffect } from "react";
// import { format, setMinutes } from 'date-fns'
// //!---Handle formatting dates
// // const formatDate = (dateString) => {
// //     return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
// // };

//!---Styles
import styles from './TimerWidgit.module.scss'

//!---Services
//Don't think I need the service here as this componant will be called inside a compnant that has it

//!--- Componants


const TimerWidgit = () => {

    //!---States
    const [time, setTime] = useState([])
    const [running, setRunning] = useState(false)

    const [seconds, setSeconds] = useState(0)
    const [minutes, setminutes] = useState(0)

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(()=>{
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);


    return (
        <main>
            <section className={styles.timerSection}>
                <h1>Timer Display Experiment</h1>
                <div>
                    <span> Y </span>
                    <span>{('0' + Math.floor((time / 6000) % 60)).slice(-2)}</span>
                    <span> M </span>
                    <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                    <span> D </span>
                    <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
                </div>
                <div>
                    <span> h </span>
                    <span>{('0' + Math.floor((time / 6000) % 60)).slice(-2)}</span>
                    <span> m </span>
                    <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                    <span> s </span>
                    <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
                </div>
                <button onClick={()=>{ setRunning(true) }}>Start</button>
                <button onClick={()=>{ setRunning(false) }}>Stop</button>
                <button onClick={()=>{ setTime(0) }}>Reset</button>
            </section>
        </main>
    )
}

export default TimerWidgit;