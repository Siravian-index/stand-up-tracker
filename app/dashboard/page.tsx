"use client"

import Countdown from "./components/Countdown"
import ParticipantList from "./components/participants/ParticipantList";
import ParticipantEntity from "./components/participants/schema/participant.entity";

const Dashboard = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const onExpire = () => console.warn('onExpire called')

  const names = ["Edward", "John", "Carlos", "Luisa", "Test"]

  const participants = names.map((name, i) => new ParticipantEntity({name, id: String(i), hasParticipated: i % 2 === 0}))

  return (
    <>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      <Countdown settings={{ expiryTimestamp: time, onExpire, autoStart: false }} />

      <ParticipantList participants={participants} />
    </>
  )
}

export default Dashboard