import React from 'react';

//!---Styles
import styles from './TimerDisplay.module.scss';


const TimerDisplay = ({ value, type}) => {
    return (
        <div className={styles.timeBlock}>
            <small>{type}</small>
            <p>{value}</p>
        </div>

    );
};

export default TimerDisplay;
