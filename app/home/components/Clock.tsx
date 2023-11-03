"use client"

import { useTime } from "react-timer-hook"



const Clock = () => {
    const {
        seconds,
        minutes,
        hours,
        ampm,
    } = useTime({});

    const addPad = (number: number) => {
        const MIN = 10
        return number < MIN ? `0${number}` : number
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6rem' }}>
                <span>{addPad(hours)}</span>:<span>{addPad(minutes)}</span>
            </div>
        </div>
    );
}

export default Clock