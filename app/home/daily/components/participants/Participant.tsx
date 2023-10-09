import { ParticipantType } from "@/schema/participant"

interface Props {
  participant: ParticipantType
  toggleParticipation: (id: string) => void
}

const Participant = ({participant, toggleParticipation}: Props) => {

  return (
    <div>
      <span onClick={() => {
        toggleParticipation(participant.id)
      }}>{participant.name}</span>
    </div>
  )
}


export default Participant
