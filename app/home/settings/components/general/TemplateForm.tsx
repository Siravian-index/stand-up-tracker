import { TextInput, Group, Box, Text, Button, Code, NumberInput } from '@mantine/core';
import { newTemplateSchema, updateTemplateSchema } from '@/schema/template';
import { TemplateService } from '@/utils/http/templates/templateService';
import { useTemplateForm } from './useTemplateForm';
import DeleteTemplateForm from './DeleteTemplateForm';
import { Action } from './GeneralSettings';



interface Props {
  templateId: string
  updateTemplateToSelect: (template: { label: string, value: string }, action: Action) => void
  removeTemplate: (templateId: string) => void
}


export default function TemplateForm({ templateId, updateTemplateToSelect, removeTemplate }: Props) {
  const { form, fields, handleInsertListItem, handleSubmit, templateName } = useTemplateForm({ templateId, updateTemplateToSelect })

  const hasParticipants = Boolean(fields.length)
  const exist = Boolean(templateId.length)
  return (
    <>
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

          {/* <Code mt="1rem" block>{JSON.stringify(form.values, null, 2)}</Code> */}
        </Box>
      </form >
      {
        exist &&
        <DeleteTemplateForm
          templateId={templateId}
          templateName={templateName}
          removeTemplate={removeTemplate}
          resetForm={form.reset}
        />
      }
    </>

  );
}