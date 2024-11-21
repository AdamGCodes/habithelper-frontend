import { useEffect, useState } from "react";

const useCounter = (startDate) => {
    // const counterDate = new Date(startDate).getTime();
    const [counterTimePassed, setCounterTimePassed] = useState([0, 0, 0, 0]);

    useEffect(() => {
        if(!startDate) {
            console.error("Invalid Start Date provided.");
            return
        };

        const target = new Date(startDate);

        const updateCounter = () => {
            const now = new Date();
            const difference = now - target;

            if (difference >= 0){
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setCounterTimePassed ([days, hours, minutes, seconds]);
            } else {
                setCounterTimePassed([0, 0, 0, 0]);
            }
        };

        updateCounter();
        const interval = setInterval(updateCounter, 1000)
        return () => clearInterval(interval);
    }, [startDate]);

    return counterTimePassed;
};

export {useCounter}