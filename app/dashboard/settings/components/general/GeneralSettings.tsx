"use client"

import { Box, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocalStorage } from "@mantine/hooks"
import NamesList from "./NamesList"


interface FormValues {
  names: string
}


const GeneralSetting = () => {
  const [participants, setParticipants] = useLocalStorage<string[]>({ key: "participants", defaultValue: [] })
  const form = useForm<FormValues>({
    initialValues: {
      names: '',
    },

    // validate: {
    //   names: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const handleSubmit = (values: FormValues) => {
    const names = values.names.split(",").map((n) => n.trim()).filter((n) => n)
    setParticipants(names)
  }

  const removeFromList = (id: string ) => {
    setParticipants((prev) => prev.filter((_, i) => String(i) !== id))
  }

  
  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Participants"
            description="Enter a comma separated list of names. i.e. Maria, Juan, Jose"
            placeholder="Input placeholder"
            {...form.getInputProps('names')}
          />
        </form>

      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <NamesList list={participants || []} removeItem={removeFromList}/>
      </Box>
    </>
  )
}

export default GeneralSetting