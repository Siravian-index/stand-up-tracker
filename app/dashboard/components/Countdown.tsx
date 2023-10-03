
"use client"
import { TimerSettings, useTimer } from "react-timer-hook"


interface Props {
  settings: TimerSettings
}

const Countdown = ({ settings }: Props) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer(settings)


  const addPad = (number: number) => {
    const MIN = 10
    return number < MIN ? `0${number}` : number
  }

  const handleToggle = isRunning ? pause : start
  const text = isRunning ? "Pause" : "Start"
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{addPad(minutes)}</span>:<span>{addPad(seconds)}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={handleToggle}>{text}</button>
      <button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 90);
        restart(time)
      }}>Restart</button>
    </div>
  );
}



export default Countdown