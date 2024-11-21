import { useState, useEffect } from "react";
// import { format, setMinutes } from 'date-fns'
// //!---Handle formatting dates
// // const formatDate = (dateString) => {
// //     return format(new Date(dateString), "d MMM, yyyy @ h:mm a");
// // };
import TimerDisplay from "../TimerDisplay/TimerDisplay";
//!---Styles
import styles from './TimerWidgit.module.scss'

//!---Services
//Don't think I need the service here as this componant will be called inside a compnant that has it

//!--- Componants
import { useCounter } from "../../hooks/useCounter";

const ShowCounter = ({ days, hours, minutes, seconds}) => {
    return(
        <div className={styles.showCounter}>
            <TimerDisplay value={ days } type={ 'D' }/>
            <TimerDisplay value={ hours } type={ 'H' } />
            <TimerDisplay value={ minutes } type={ 'M' } />
            <TimerDisplay value={ seconds } type={'S'} />
        </div>
    );
};


const TimerWidgit = ({ startDate }) => {

    const[days, hours, minutes, seconds ] = useCounter(startDate);

    //STRETCH POTENTIAL create a conditional if to send notifications or maybe even awards for milesstones. 
    //It would be something like
    //if (day = 7){
    //return (One week award)  
    //} 
    return (
        <ShowCounter
        days = { days } 
        hours = { hours }
        minutes = { minutes }
        seconds = { seconds }
        />
    );

}

export default TimerWidgit;
