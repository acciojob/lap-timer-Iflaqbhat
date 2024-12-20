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
      <div>
        <button id="start-btn" onClick={startTimer}>
          Start
        </button>
        <button id="stop-btn" onClick={stopTimer}>
          Stop
        </button>
        <button id="lap-btn" onClick={recordLap}>
          Lap
        </button>
        <button id="reset-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <div id="laps">
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              <ul>{formatTime(lap)}</ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
