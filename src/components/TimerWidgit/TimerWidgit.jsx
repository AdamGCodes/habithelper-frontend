import { useState, useEffect } from "react";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import styles from './TimerWidgit.module.scss';
import { useCounter } from "../../hooks/useCounter";

const ShowCounter = ({ years, months, days, hours, minutes, seconds }) => {
    return (
        <>
            <div className={styles.timerRow}>
                <TimerDisplay value={years} type="Y" />
                <TimerDisplay value={months} type="M" />
                <TimerDisplay value={days} type="D" />
            </div>
            <div className={styles.timerRow}>
                <TimerDisplay value={hours} type="h" />
                <TimerDisplay value={minutes} type="m" />
                <TimerDisplay value={seconds} type="s" />
            </div>
        </>
    );
};

const TimerWidgit = ({ startDate }) => {
    const [years, months, days, hours, minutes, seconds] = useCounter(startDate);

    return (
        <section className={styles.timerWidgitSection}>
            <ShowCounter
                years={years}
                months={months}
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        </section>
    );
};

export default TimerWidgit;
