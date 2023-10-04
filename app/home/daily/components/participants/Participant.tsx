import ParticipantEntity from "./schema/participant.entity"

interface Props {
  participant: ParticipantEntity
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
