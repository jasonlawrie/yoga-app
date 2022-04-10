import React, { useState } from 'react';
import './Timer.css'

function Timer({ duration }) {
    const [currentValue, setCurrentValue] = useState(duration * 1000);
    const [intervalId, setIntervalId] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("green");

    const resetTimer = () => {
        stopTimer();
        setCurrentValue(duration * 1000);
        setBackgroundColor(formatColor(duration * 1000));
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
                    clearInterval(interval);
                    setIntervalId(false);
                }
                setBackgroundColor(formatColor(value));
            }, 100);
            setIntervalId(interval);
        }
    }

    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(false);
        }
    }

    const formatTime = (numTime) => {
        const totalSeconds = numTime / 1000;
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
        const seconds = (totalSeconds - hours * 3600 - minutes * 60);
        let secondString = seconds.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) secondString = '0' + secondString;
        return hours + ':' + minutes + ':' + secondString;
    }

    const formatColor = (numTime) => {
        let color = "red";
        switch (true) {
            case (numTime > 3000):
                color = "green";
                break;
            case (numTime > 0):
                color = "yellow";
                break;
            default:
                color = "red";
                break;
        }
        return color;
    }

    return (
        <div className={`timer-component ${backgroundColor}`}>
            <div className="timer-display">
                {formatTime(currentValue)}
            </div>
            <div className="timer-buttons">
                <button onClick={resetTimer}>RESET</button>
                <button onClick={startTimer}>START</button>
                <button onClick={stopTimer}>STOP</button>
            </div>
        </div>
    )
}

export default Timer;