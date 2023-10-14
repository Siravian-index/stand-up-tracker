
import { Flex, Title } from "@mantine/core"
import Participant from "./Participant"
import { ParticipantType } from "@/schema/participant"


interface Props {
}

const ParticipantList = ({ }: Props) => {
  const participants: ParticipantType[] = []



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

          return <Participant key={p.id} participant={p} />
        })}

        <Title order={3}>Already participated</Title>
        {participants.filter((p) => p.hasParticipated).map((p) => {

          return <Participant key={p.id} participant={p} />
        })}
      </Flex>
    </>
  )
}


export default ParticipantList
