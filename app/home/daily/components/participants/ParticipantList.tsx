
"use client"

import { Box, Flex, Title } from "@mantine/core"
import Participant from "./Participant"
import { ParticipantType } from "@/schema/participant"


interface Props {
  participants: ParticipantType[]
}

const ParticipantList = ({ participants }: Props) => {
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

          <Box >
            <Title order={3}>Pending</Title>

            {participants.filter((p) => !p.hasParticipated).map((p) => {

              return <Participant key={p.id} participant={p} />
            })}
          </Box>

          <Box >
            <Title order={3}>Done talking</Title>
            {participants.filter((p) => p.hasParticipated).map((p) => {

              return <Participant key={p.id} participant={p} />
            })}
          </Box>
        </Flex>

      </Flex>
    </>
  )
}


export default ParticipantList
