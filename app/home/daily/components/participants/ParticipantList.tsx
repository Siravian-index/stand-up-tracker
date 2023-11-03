
"use client"

import { Box, Flex, Title } from "@mantine/core"
import Participant from "./Participant"
import { ParticipantType } from "@/schema/participant"
import { useState } from "react"


interface Props {
  participants: ParticipantType[]
}

const ParticipantList = ({ participants: list }: Props) => {
  const [participants, setParticipants] = useState(list)

  const updateParticipantCheck = (id: string, checked: boolean) => {
    setParticipants((list) => list.map((participant) => {
      if (participant.id === id) {
        return { ...participant, hasParticipated: !participant.hasParticipated }
      }
      return participant
    }))
  }
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


        <Flex
          justify="space-around"
          direction="row"
          wrap="wrap"
          gap="lg"
        >

          <Flex
            direction="column"
            align="center"
          >
            <Title order={3}>Pending</Title>
            {participants.filter((p) => !p.hasParticipated).map((p) => {
              return <Participant key={p.id} participant={p} handleChange={updateParticipantCheck} />
            })}
          </Flex>

          <Flex
            direction="column"
            align="center"
          >
            <Title order={3}>Done talking</Title>
            {participants.filter((p) => p.hasParticipated).map((p) => {
              return <Participant key={p.id} participant={p} handleChange={updateParticipantCheck} />
            })}
          </Flex>
        </Flex>

      </Flex>
    </>
  )
}


export default ParticipantList
