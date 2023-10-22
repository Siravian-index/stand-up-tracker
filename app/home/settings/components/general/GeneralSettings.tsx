"use client"

import { Box, Group, Select } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TemplateType } from "@/schema/template";
import { useForm } from "@mantine/form";
import { MAX_TEMPLATE_LIMIT } from "@/lib/errors/TemplateLimit";

interface Props {
  templates: TemplateType[]
}


const GeneralSetting = ({ templates }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      templateId: ""
    },
  })

  const handleCreateTemplateClick = () => {
    form.setFieldValue("templateId", "")
    open()
  }

  const templatesData = templates.map((t) => ({ label: t.name, value: t.id }))

  const currentTemplates = templates.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATE_LIMIT
  const hasContent = Boolean(currentTemplates)
  const hasTemplateId = Boolean(form.values.templateId)
  return (
    <Box maw={500}>

      <Modal opened={opened} onClose={close} title="Create new Template">
        <TemplateForm templateId={form.values.templateId} />
      </Modal>
      {
        // TODO: handle edit template
        hasContent &&
        <form>
          <Select
            label="Current Template"
            placeholder="Pick a template"
            data={templatesData}
            {...form.getInputProps("templateId")}
          />

        </form>
      }
      <Group>

        {
          hasTemplateId &&
          <Button onClick={open}>Edit current template</Button>
        }
        {
          canCreateTemplate &&
          <Button disabled={!canCreateTemplate} onClick={handleCreateTemplateClick}>Add new template</Button>
        }
      </Group>
    </Box>
  )
}

export default GeneralSetting