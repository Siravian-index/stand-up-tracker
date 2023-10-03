"use client"

import { Flex, Title } from "@mantine/core";
import Countdown from "./components/Countdown"
import ParticipantList from "./components/participants/ParticipantList";
import ParticipantEntity from "./components/participants/schema/participant.entity";

const Dashboard = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const onExpire = () => console.warn('onExpire called')

  const names = ["Edward", "John", "Carlos", "Luisa", "Test"]

  const participants = names.map((name, i) => new ParticipantEntity({ name, id: String(i), hasParticipated: i % 2 === 0 }))

  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="center"
      >
        <Title>Dashboard</Title >
      </Flex>
      <Countdown settings={{ expiryTimestamp: time, onExpire, autoStart: false }} />

      <ParticipantList participants={participants} />
    </>
  )
}

export default Dashboard