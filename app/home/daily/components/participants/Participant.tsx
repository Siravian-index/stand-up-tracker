"use client"

import { ParticipantType } from "@/schema/participant"
import { Checkbox, Flex, Text } from "@mantine/core"
import { useState } from "react"

interface Props {
  participant: ParticipantType
  handleChange: (id: string, checked: boolean) => void
}

const Participant = ({ participant, handleChange }: Props) => {
  return (
    <Flex
      gap="lg"
      mt="sm"
    >
      <Checkbox
        labelPosition="left"
        label={participant.name}
        checked={participant.hasParticipated}
        onChange={(event) => handleChange(participant.id, event.currentTarget.checked)}
      />
    </Flex>
  )
}


export default Participant
