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
        const totalSeconds: number = numTime / 1000;
        const hours: number = Math.floor(totalSeconds / 3600);
        const minutes: number = Math.floor((totalSeconds - hours * 3600) / 60);
        const seconds: number = (totalSeconds - hours * 3600 - minutes * 60);
        let secondString = seconds.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).padStart(4, "0");
        let minuteString = String(minutes).padStart(2, "0");
        let hourString = String(hours).padStart(2, "0");
        return hourString + ':' + minuteString + ':' + secondString;
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