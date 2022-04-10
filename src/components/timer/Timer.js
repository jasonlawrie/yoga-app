import React, { useState } from 'react';
import './Timer.css'

function Timer({ duration }) {
    const [currentValue, setCurrentValue] = useState(duration*1000);
    const [intervalId, setIntervalId] = useState(false);

    const resetTimer = () => {
        stopTimer();
        setCurrentValue(duration*1000);
    }

    const startTimer = () => {
        if (!intervalId) {
            const startTime = Date.now();
            const startValue = currentValue;
            const interval = setInterval(() => {
                const value = startValue - (Date.now() - startTime);
                if (value >= 0) {
                    setCurrentValue(value);
                } else {
                    setCurrentValue(0);
                    stopTimer();
                }
            }, 100);
            setIntervalId(interval);
        }
    }

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(false);
    }

    const formatTime = (numTime) => {
        let totalSeconds = numTime / 1000;
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
        let seconds = (totalSeconds - hours * 3600 - minutes * 60);
        let secondString = seconds.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) secondString = '0' + secondString;
        return hours + ':' + minutes + ':' + secondString;
    }

    return (
        <span className="timer-component">
            <div className="timer-display">
                {formatTime(currentValue)}
            </div>
            <div className="timer-buttons">
                <button onClick={resetTimer}>RESET</button>
                <button onClick={startTimer}>START</button>
                <button onClick={stopTimer}>STOP</button>
            </div>
        </span>
    )
}

export default Timer;