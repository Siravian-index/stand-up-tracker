import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code, NumberInput, Flex } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { newTemplateSchema } from '@/schema/template';
import { TemplateService } from '@/utils/http/templates/templateService';



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
    validate: zodResolver(newTemplateSchema)
  });

  const fields = form.values.participants.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        label={`Participant ${index + 1}`}
        placeholder="Ana Maria"
        style={{ flex: 1 }}
        {...form.getInputProps(`participants.${index}.name`)}
      />
      <Group mt="1.5rem">
        <Switch
          label="Active"
          {...form.getInputProps(`participants.${index}.hasParticipated`, { type: 'checkbox' })}
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('participants', index)}>
          <IconTrash size={20} />
        </ActionIcon>
      </Group>
    </Group>
  ));

  const handleInsertListItem = () => {
    const MAX_SIZE = 15
    const currentParticipants = form.values.participants.length
    if (currentParticipants < MAX_SIZE) {
      form.insertListItem('participants', { name: '', hasParticipated: false, key: randomId() })
    }
  }


  const handleSubmit = async (values: typeof form.values) => {
    createTemplate(values)
  }

  const createTemplate = async (values: typeof form.values) => {
    try {
      const payload = newTemplateSchema.parse(values)
      const service = new TemplateService()
      const res = await service.post(payload)
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateTemplate = async (values: typeof form.values) => {

  }


  const hasParticipants = Boolean(fields.length)
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Box maw={500} mx="auto">
        <Group mt="xs">
          <TextInput
            label="Template Name"
            placeholder="Blue Team"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <NumberInput
            label="Timer"
            placeholder="100"
            withAsterisk
            style={{ flex: 1 }}
            {...form.getInputProps("time")}
            onChange={(v) => {
              form.setFieldValue("time", Number(v))
            }}
          />
        </Group>

        {!hasParticipants && (
          <Text c="dimmed" ta="center" mt="md">
            No one here...
          </Text>
        )}

        {fields}

        <Group justify="start" mt="md">
          <Button
            onClick={handleInsertListItem}
          >
            Add participant
          </Button>
        </Group>

        <Group justify="end" mt="md">
          <Button type='submit' disabled={!form.isValid()}>
            Submit
          </Button>
        </Group>

        <Code mt="1rem" block>{JSON.stringify(form.values, null, 2)}</Code>
      </Box>
    </form >

  );
}