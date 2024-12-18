import React, { useState, useEffect } from "react";

// Stopwatch Component
function Stopwatch({ isActive }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button disabled={isActive} onClick={() => setIsRunning(true)}>Start</button>
        <button disabled={isActive} onClick={() => setIsRunning(false)}>Stop</button>
        <button
          disabled={isActive}
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;