import React from 'react';

//!---Styles
import styles from './TimerDisplay.module.scss'


const TimerDisplay = ({ value, type}) => {
    return (
        <div className={styles.timerElement}>
            <span><small>{type}</small></span>
            <p>{value}</p>
        </div>
    );
};

export default TimerDisplay;
