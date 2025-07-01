import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";

const useCounter = (startDate) => {
    const [timePassed, setTimePassed] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!startDate) {
            console.error("Invalid startDate provided to useCounter.");
            return;
        }

        const start = new Date(startDate);

        const updateCounter = () => {
            const now = new Date();
            const duration = intervalToDuration({ start, end: now });

            setTimePassed(duration);
        };

        updateCounter(); // initial call
        const interval = setInterval(updateCounter, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return [
        timePassed.years,
        timePassed.months,
        timePassed.days,
        timePassed.hours,
        timePassed.minutes,
        timePassed.seconds
    ];
};

export { useCounter };
