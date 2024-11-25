import React from 'react';

//!---Styles
import styles from './TimerDisplay.module.scss'


const TimerDisplay = ({ value, type}) => {
    return (
        <>
            <small>{type}</small>
            <p>{value}</p>
        </>
    );
};

export default TimerDisplay;
