"use client"

import { Box, Select } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TemplateType } from "@/schema/template";

interface Props {
  templates: TemplateType[]
}


const MAX_TEMPLATES_LIMIT = 3
const GeneralSetting = ({ templates }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleEditTemplate = () => {

  }

  const templatesData = templates.map((t) => ({ label: t.name, value: t.id }))

  const currentTemplates = templates.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATES_LIMIT
  const hasContent = Boolean(currentTemplates)

  return (
    <Box maw={500}>
      {
        hasContent &&
        <Select
          label="Current Template"
          placeholder="Pick a template"
          data={templatesData}
        />
      }
      <Button onClick={handleEditTemplate}>Edit current template</Button>


      <>
        <Modal opened={opened} onClose={close} title="Create new Template">
          <TemplateForm />
        </Modal>
        <Button disabled={!canCreateTemplate} onClick={open}>Add new template</Button>
      </>
      {/* <Overlay color="#000" backgroundOpacity={0.35} blur={8} /> */}
    </Box>
  )
}

export default GeneralSetting