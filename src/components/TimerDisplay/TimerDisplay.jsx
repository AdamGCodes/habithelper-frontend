import React from 'react';

//!---Styles
import styles from './TimerDisplay.module.scss';


const TimerDisplay = ({ value, type}) => {
    return (
        <div className={styles.timeBlock}>
            <small>{type}</small>
            <p>{(value !== undefined && value !== null ? value : 0).toString().padStart(2, '0')}</p>

        </div>

    );
};

export default TimerDisplay;
