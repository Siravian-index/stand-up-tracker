"use client"
import { Flex, Title } from "@mantine/core"
import Participant from "./Participant"
import ParticipantEntity from "./schema/participant.entity"
import { useEffect, useState } from "react"


interface Props {
}

const ParticipantList = ({ }: Props) => {

  const [participants, setParticipants] = useState<ParticipantEntity[]>([])

  const toggleParticipation = (id: string) => {
    setParticipants((prev) => prev.map((p) => p.id === id ? p.toggleParticipation() : p))
  }

  useEffect(() => {
    const key = localStorage.getItem("participants")
    if (!key) {
      return
    }
    const value = JSON.parse(key)
    if (Array.isArray(value)) {
      const participants = value.map((name, i) => new ParticipantEntity({ name, id: String(i), hasParticipated: false }))
      setParticipants(participants)
    }

  }, [])

  return (
    <>
      <Flex
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={3}>Participants</Title>


        <Title order={3}>Pending</Title>

        {participants.filter((p) => !p.hasParticipated).map((p) => {

          return <Participant key={p.id} participant={p} toggleParticipation={toggleParticipation} />
        })}

        <Title order={3}>Already participated</Title>
        {participants.filter((p) => p.hasParticipated).map((p) => {

          return <Participant key={p.id} participant={p} toggleParticipation={toggleParticipation} />
        })}
      </Flex>
    </>
  )
}


export default ParticipantList
