"use client"

import Countdown from "./components/Countdown"

const Dashboard = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const onExpire = () => console.warn('onExpire called')
  return (
    <>
      <h1>dashboard</h1>
      <Countdown settings={{ expiryTimestamp: time, onExpire, autoStart: false }} />
    </>
  )
}

export default Dashboard