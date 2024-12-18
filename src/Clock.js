import React, { useState, useEffect } from "react";
// Clock Component
function Clock({ isActiveHandler }) {
    const [isDigital, setIsDigital] = useState(false);
    const [time, setTime] = useState(new Date());

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Function to schedule the random class addition
        const scheduleRandomClass = () => {
            const randomHour = Math.floor(Math.random() * 24); // Random hour (0–23)
            const randomMinute = Math.floor(Math.random() * 60); // Random minute (0–59)

            const now = new Date();
            const targetTime = new Date();

            // Set the target time to the selected random time
            targetTime.setHours(randomHour, randomMinute, 0, 0);

            // Calculate the delay (can be negative if the time is in the past)
            const delay = targetTime - now;
            console.log('Time pending in minutes',delay / 60000);

            // Schedule the class addition (even if delay is negative)
            const timeoutInitial = setTimeout(() => {
                setIsActive(true); // Add the class
                const isDigitalTempVal = isDigital;
                setIsDigital(false);
                // Remove the class after 5 minutes
                const resetTimeOut = setTimeout(() => {
                    setIsActive(false);
                    setIsDigital(isDigitalTempVal);
                    clearTimeout(timeoutInitial);
                    clearTimeout(resetTimeOut);
                }, 5 * 60 * 1000);
            }, delay);
        };

        // Schedule the process every 24 hours
        scheduleRandomClass();
        const intervalId = setInterval(scheduleRandomClass, 24 * 60 * 60 * 1000);

        // Clean up on component unmount
        return () => clearInterval(intervalId);
    },[]);

    useEffect(()=> {
        isActiveHandler(isActive);
    },[isActive, isActiveHandler])


    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    };

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculate rotations
    const hourRotation = (hours % 12) * 30 + minutes * 0.5;
    const minuteRotation = minutes * 6 + seconds * 0.1;
    const secondRotation = seconds * 6;

    // Debug logs
    // console.log("Current Time:", time.toLocaleTimeString());
    // console.log("Hour Rotation:", hourRotation);
    // console.log("Minute Rotation:", minuteRotation);
    // console.log("Second Rotation:", secondRotation);

    const renderAnalogClock = () => (
        <div className={`analog-clock ${isActive && "active"}`} data-love={`${isActive ? "<3" : "Coming Soon!"}`}>
            {/* {[...Array(12)].map((_, index) => (
                <div
                    key={index}
                    className="clock-hour-mark"
                    style={{ transform: `rotate(${index * 30}deg)` }}
                >
                    <span style={{ transform: `rotate(-${index * 30}deg)` }}>{index === 0 ? 12 : index}</span>
                </div>
            ))}
            {[...Array(60)].map((_, index) => (
                <div
                    key={index}
                    className="clock-minute-mark"
                    style={{ transform: `rotate(${index * 6}deg)` }}
                ></div>
            ))} */}
            <div
                className="hour-hand"
                style={{ transform: `rotate(${hourRotation + 270}deg)` }}
            />
            <div
                className="minute-hand"
                style={{ transform: `rotate(${minuteRotation + 270}deg)` }}
            />
            <div
                className="second-hand"
                style={{ transform: `rotate(${secondRotation + 270}deg)` }}
            />
            <div className="center-dot" />
        </div>
    );

    return (
        <div className="clock">
            <select
                className="clock-selector"
                value={isDigital ? "digital" : "analog"}
                onChange={(e) => setIsDigital(e.target.value === "digital")}
                disabled={isActive}
            >
                <option value="analog">Analog</option>
                <option value="digital">Digital</option>
            </select>
            {isDigital ? <div className="digital-clock">{formatTime(time)}</div> : renderAnalogClock()}
        </div>
    );
}

export default Clock;