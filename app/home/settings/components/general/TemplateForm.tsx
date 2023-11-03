import { TextInput, Group, Box, Text, Button, Code, NumberInput, LoadingOverlay, Notification, Modal, Flex } from '@mantine/core';
import { useTemplateForm } from './useTemplateForm';
import DeleteTemplateForm from './DeleteTemplateForm';
import { Action } from './GeneralSettings';



interface Props {
  templateId: string
  updateTemplateToSelect: (template: { label: string, value: string }, action: Action) => void
  isModalOpen: boolean
  closeModal: () => void
}


export default function TemplateForm({ templateId, updateTemplateToSelect, isModalOpen, closeModal }: Props) {
  const { form, fields, handleInsertListItem, handleSubmit, templateName, loading, } = useTemplateForm({ templateId, updateTemplateToSelect })
  const hasParticipants = Boolean(fields.length)
  const exist = Boolean(templateId.length)

  const onDelete = () => {
    form.reset()
    closeModal()
  }

  const formTitle = exist ? "Update Template" : "Create new Template"
  return (
    <>
      <Modal opened={isModalOpen} onClose={closeModal} title={formTitle}>

        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Box maw={500} mx="auto" >
            <Flex
              mt="xs"
              justify="space-between"
              style={{ outline: "2px solid red" }}
            >
              <TextInput
                label="Name"
                description="Template's name."
                placeholder="Blue Team"
                withAsterisk
                {...form.getInputProps("name")}
                disabled={loading}
                onBlur={() => form.validate()}
              />
              <NumberInput
                maw="8rem"
                allowDecimal={false}
                allowNegative={false}
                label="Timer"
                placeholder="100"
                withAsterisk
                // style={{ flex: 1 }}
                {...form.getInputProps("time")}
                onChange={(v) => {
                  form.setFieldValue("time", Number(v))
                }}
                onBlur={() => form.validate()}
                description="Time in seconds."
                disabled={loading}
              />
            </Flex>

            {!hasParticipants && (
              <Text c="dimmed" ta="center" mt="md">
                No one here...
              </Text>
            )}

            {fields}

            <Group justify="center" mt="md">
              <Button
                onClick={handleInsertListItem}
                disabled={loading}
              >
                Add participant
              </Button>
            </Group>

            <Group justify="end" mt="md">
              <Button type='submit' disabled={loading || !form.isValid()}>
                Submit
              </Button>
            </Group>
            {/* <Code mt="1rem" block>{JSON.stringify(form.values, null, 2)}</Code> */}
          </Box>
        </form >
        {
          (exist && !loading) &&
          <DeleteTemplateForm
            templateId={templateId}
            templateName={templateName}
            updateTemplateToSelect={updateTemplateToSelect}
            onDelete={onDelete}
          />
        }
      </Modal>
    </>
  );
}