import React, { useState, useEffect } from "react";

// Timer Component
function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="timer">
            <div className="time-display">{formatTime(time)}</div>
            <div className="controls">
                <input
                    type="number"
                    placeholder="Set Time (sec)"
                    onChange={(e) => setTime(Number(e.target.value))}
                    disabled={isRunning}
                />
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Pause</button>
                <button onClick={() => { setTime(0); setIsRunning(false); }}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;