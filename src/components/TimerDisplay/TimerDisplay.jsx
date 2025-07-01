import React from 'react';
import styles from './TimerDisplay.module.scss';

const TimerDisplay = ({ value, type }) => {
    const unitLabels = {
        Y: "Years",
        M: "Months",
        D: "Days",
        h: "Hours",
        m: "Minutes",
        s: "Seconds"
    };

    const label = unitLabels[type] || "Time unit";
    const paddedValue = (value !== undefined && value !== null ? value : 0).toString().padStart(2, '0');

    return (
        <div className={styles.timeBlock} aria-label={`${label}: ${paddedValue}`}>
            <small>{type}</small>
            <p>{paddedValue}</p>
        </div>
    );
};

export default TimerDisplay;
