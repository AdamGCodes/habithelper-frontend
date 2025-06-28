import { useEffect, useState } from "react";

const useCounter = (startDate) => {
    const [timePassed, setTimePassed] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!startDate) {
            console.error("Invalid Start Date provided.");
            return;
        }

        const target = new Date(startDate);

        if (isNaN(target.getTime())) {
            console.error("Invalid startDate passed to useCounter:", startDate);
        } else {
            console.log("Parsed startDate:", target.toISOString());
        }
        

        const updateCounter = () => {
            const now = new Date();
            const utcNow = new Date(now.toISOString()); // ensure consistent UTC

            const difference = utcNow - target;

            console.log("⏱ Tick:");
            console.log("→ now (UTC):", utcNow.toISOString());
            console.log("→ target:", target.toISOString());
            console.log("→ difference (ms):", difference);
            console.log("→ seconds:", Math.floor((difference / 1000) % 60));

            if (difference >= 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimePassed((prev) => {
                    // Only update state if values have changed
                    if (
                        prev.days !== days ||
                        prev.hours !== hours ||
                        prev.minutes !== minutes ||
                        prev.seconds !== seconds
                    ) {
                        return { days, hours, minutes, seconds };
                    }
                    return prev;
                });
            } else {
                setTimePassed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCounter();
        const interval = setInterval(updateCounter, 1000);
        return () => clearInterval(interval);
    }, [startDate]);

    return [timePassed.days, timePassed.hours, timePassed.minutes, timePassed.seconds];
};

export { useCounter };
