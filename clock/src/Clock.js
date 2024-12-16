import React, { useState, useEffect } from "react";
// Clock Component
function Clock() {
    const [isDigital, setIsDigital] = useState(false);
    const [time, setTime] = useState(new Date());

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

    const renderAnalogClock = () => (
        <div className="analog-clock">
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
                style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}
            />
            <div
                className="minute-hand"
                style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}
            />
            <div
                className="second-hand"
                style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}
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
            >
                <option value="analog">Analog</option>
                <option value="digital">Digital</option>
            </select>
            {isDigital ? <div className="digital-clock">{formatTime(time)}</div> : renderAnalogClock()}
        </div>
    );
}

export default Clock;