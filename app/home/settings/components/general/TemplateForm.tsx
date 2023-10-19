import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code, NumberInput } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { newTemplateSchema } from '@/schema/template';



interface Props {
  // id: string
}


export default function TemplateForm() {
  const form = useForm({
    initialValues: {
      participants: [{ name: 'David', hasParticipated: false, key: randomId(), }],
      name: 'testing template 1',
      time: 90,
    },
    // validate: zodResolver(newTemplateSchema)
  });

  const fields = form.values.participants.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="Ana Maria"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`participants.${index}.name`)}
      />
      <Switch
        label="Active"
        {...form.getInputProps(`participants.${index}.hasParticipated`, { type: 'checkbox' })}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('participants', index)}>
        <IconTrash size={20} />
      </ActionIcon>
    </Group>
  ));

  const handleInsertListItem = () => {
    const participants = form.values.participants
    const allHaveValue = participants.every(p => p.name)
    if (allHaveValue || !Boolean(participants.length)) {
      form.insertListItem('participants', { name: '', hasParticipated: false, key: randomId() })
    }

  }


  const handleSubmit = async (values: typeof form.values) => {
    console.log("prev values: ", values)

  
    const payload = values

    try {
      const res = await fetch(`http://localhost:3000/api/participants/`, {
        body: JSON.stringify(payload),
        method: "POST"
      })
      const data = await res.json()
      debugger

    } catch (error) {
      console.error(error)
    }
  }


  const hasParticipants = Boolean(fields.length)
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Box maw={500} mx="auto">
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Template Name
          </Text>
          <Text fw={500} size="sm" pr={90}>
            Timer
          </Text>
        </Group>
        <Group mt="xs">
          <TextInput
            placeholder="Template Name"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <NumberInput
            placeholder="Timer value"
            withAsterisk
            min={20}
            max={180}
            style={{ flex: 1 }}
            {...form.getInputProps("time")}
          />
        </Group>
        {hasParticipants ? (
          <Group mb="xs">
            <Text fw={500} size="sm" style={{ flex: 1 }}>
              Participants
            </Text>
            <Text fw={500} size="sm" pr={90}>
              Status
            </Text>
          </Group>
        ) : (
          <Text c="dimmed" ta="center">
            No one here...
          </Text>
        )}

        {fields}

        <Group justify="center" mt="md">
          <Button
            onClick={handleInsertListItem}
          >
            Add participant
          </Button>
        </Group>

        <Button type='submit'>
          Submit
        </Button>

        <Text size="sm" fw={500} mt="md">
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </Box>
    </form >

  );
}