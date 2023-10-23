import { TextInput, Group, Box, Text, Button, Code, NumberInput } from '@mantine/core';
import { newTemplateSchema, updateTemplateSchema } from '@/schema/template';
import { TemplateService } from '@/utils/http/templates/templateService';
import { useTemplateForm } from './useTemplateForm';



interface Props {
  templateId: string
}


export default function TemplateForm({ templateId }: Props) {
  const { form, fields, handleInsertListItem, handleSubmit } = useTemplateForm({ templateId })

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