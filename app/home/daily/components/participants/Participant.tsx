import { ParticipantType } from "@/schema/participant"
import { Box, Checkbox, Flex } from "@mantine/core"

interface Props {
  participant: ParticipantType
}

const Participant = ({ participant, }: Props) => {

  return (
    <Flex
      justify="center"

    >
      <span>{participant.name}</span>
      <Checkbox />
    </Flex>
  )
}


export default Participant
