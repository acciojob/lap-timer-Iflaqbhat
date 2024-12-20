import React, { useState, useEffect, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, centiseconds: 0 });
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const formatTime = ({ minutes, seconds, centiseconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { minutes, seconds, centiseconds } = prevTime;

          centiseconds += 1;
          if (centiseconds === 100) {
            centiseconds = 0;
            seconds += 1;
          }
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }

          return { minutes, seconds, centiseconds };
        });
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const resetTimer = () => {
    stopTimer();
    setTime({ minutes: 0, seconds: 0, centiseconds: 0 });
    setLaps([]);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="App">
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={recordLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <ul className="lap-list">
        {laps.map((lap, index) => (
          <li key={index}>
            <ul>{formatTime(lap)}</ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
