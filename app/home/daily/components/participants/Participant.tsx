import { ParticipantType } from "@/schema/participant"

interface Props {
  participant: ParticipantType
}

const Participant = ({ participant, }: Props) => {

  return (
    <div>
      <span onClick={() => {
        // toggleParticipation(participant.id)
      }}>{participant.name}</span>
    </div>
  )
}


export default Participant
