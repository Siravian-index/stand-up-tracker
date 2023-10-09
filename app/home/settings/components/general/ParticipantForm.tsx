import { capitalizeWord } from "@/utils/strings/capitalizeWord"
import { Box, TextInput } from "@mantine/core"
import { z } from "zod"


const createParticipants = async (data: FormData) => {
  "use server"
  const names = data.get("names")?.valueOf()
  // change this to a zod validation
  if (typeof names === "string" && names.length) {
    const list = names.split(",").map(n => n.trim()).filter(n => n).flatMap(n => n.split(" ").map(n => capitalizeWord(n)))
    console.log(list)
  }

}

const ParticipantForm = () => {

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <form action={createParticipants}>
        <TextInput
          name="names"
          label="Participants"
          description="Enter a comma separated list of names. "
          placeholder="i.e. Maria, Juan, Jose"
        />
        <button type="submit">Add</button>
      </form>
    </Box>
  )
}

export default ParticipantForm