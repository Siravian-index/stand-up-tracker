import { Flex, Title } from "@mantine/core"
import Participant from "./Participant"
import { IParticipant } from "@/schema/participant"


interface Props {
}

const ParticipantList = ({ }: Props) => {
  const participants: IParticipant[] = []
  const toggleParticipation = (id: string) => {
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
