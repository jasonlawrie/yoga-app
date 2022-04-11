import React, { useState } from 'react';
import './Timer.css'

function Timer({ duration }) {
    const [currentValue, setCurrentValue] = useState(duration * 1000);
    const [intervalId, setIntervalId] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("green");
    const context = new AudioContext();
    const o = context.createOscillator();
    o.frequency.setTargetAtTime(0, context.currentTime, 0.001);
    o.connect(context.destination);
    let isStarted = false;


    const resetTimer = () => {
        stopTimer();
        setCurrentValue(duration * 1000);
        setBackgroundColor("green");
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
                triggerEvents(value);
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
        const secondString = seconds.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).padStart(4, "0");
        const minuteString = String(minutes).padStart(2, "0");
        const hourString = String(hours).padStart(2, "0");
        return hourString + ':' + minuteString + ':' + secondString;
    }

    const playTone = (m) => {
        o.frequency.setTargetAtTime(0, context.currentTime, 0.001);
        o.frequency.setTargetAtTime(Math.pow(2, (m - 69) / 12) * 440, context.currentTime + .1, 0.001);
        o.frequency.setTargetAtTime(0, context.currentTime + 0.3, 0.001);
        if (!isStarted) {
            o.start(0);
            isStarted = true;
        }
    }

    const triggerEvents = (numTime) => {
        switch (true) {
            case (numTime <= 3050 && numTime > 2950):
                setBackgroundColor("yellow");
                playTone(60);
                break;
            case (numTime <= 2050 && numTime > 1950):
                playTone(60);
                break;
            case (numTime <= 1050 && numTime > 950):
                playTone(60);
                break;
            case (numTime < 50):
                setBackgroundColor("red");
                playTone(72);
                setTimeout(() => {
                    if (isStarted) {
                        o.stop(0);
                        isStarted = false;
                    }
                }, 500);
                break;
        }
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