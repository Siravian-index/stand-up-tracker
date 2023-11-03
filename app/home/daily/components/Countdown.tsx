
"use client"
import { TimerSettings, useTimer } from "react-timer-hook"


interface Props {
  // settings: TimerSettings
  time: number
}

const Countdown = ({ time }: Props) => {

  const generateTimer = (seconds = 90) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds)
    return time
  }
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp: generateTimer(time), autoStart: false })



  const addPad = (number: number) => {
    const MIN = 10
    return number < MIN ? `0${number}` : number
  }

  const handleToggle = () => {
    if (!seconds) {
      return handleRestart
    }
    return isRunning ? pause : start
  }

  const handleRestart = () => restart(generateTimer(time))
  const text = isRunning ? "Pause" : "Start"
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '6rem' }}>
        <span>{addPad(minutes)}</span>:<span>{addPad(seconds)}</span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      <button onClick={handleToggle()}>{text}</button>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}



export default Countdown