"use client"

import { Flex, Title } from "@mantine/core";
import Countdown from "./components/Countdown"
import ParticipantList from "./components/participants/ParticipantList";
import ParticipantEntity from "./components/participants/schema/participant.entity";
import { useLocalStorage } from "@mantine/hooks";

const Dashboard = () => {
  // const [names, setNames] = useLocalStorage<string[]>({ key: "participants", defaultValue: [] })
  const names: string[] = JSON.parse(localStorage.getItem("participants") || "") || []
  
  const time = new Date();
  time.setSeconds(time.getSeconds() + 90)

  const onExpire = () => console.warn('onExpire called')
  
  const participants = names.map((name, i) => new ParticipantEntity({ name, id: String(i), hasParticipated: false}))
  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <Title>Dashboard</Title >

      </Flex>
      <Countdown settings={{ expiryTimestamp: time, onExpire, autoStart: false }} />

      <ParticipantList participants={participants || []} />
    </>
  )
}

export default Dashboard