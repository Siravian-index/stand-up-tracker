import { Flex } from "@mantine/core"
import Participant from "./Participant"
import ParticipantEntity from "./schema/participant.entity"
import { useState } from "react"


interface Props {
  participants: ParticipantEntity[]
}

const ParticipantList = ({ participants: list }: Props) => {

  const [participants, setParticipants] = useState(list)

  const toggleParticipation = (id: string) => {
    setParticipants((prev) => prev.map((p) => p.id === id ? p.toggleParticipation() : p))
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
        <h3>Participants</h3>


        <h3>Pending</h3>

        {participants.filter((p) => !p.hasParticipated).map((p) => {

          return <Participant key={p.id} participant={p} toggleParticipation={toggleParticipation} />
        })}

        <h3>Already participated</h3>
        {participants.filter((p) => p.hasParticipated).map((p) => {

          return <Participant key={p.id} participant={p} toggleParticipation={toggleParticipation} />
        })}
      </Flex>
    </>
  )
}


export default ParticipantList
