"use client"

import { Box, Select } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TemplateType } from "@/schema/template";
import { useForm } from "@mantine/form";

interface Props {
  templates: TemplateType[]
}


const MAX_TEMPLATES_LIMIT = 3
const GeneralSetting = ({ templates }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      templateId: ""
    },
    // validate: {
    //   templateId: (value) => Boolean(value.length) ? null : "Invalid id"
    // }
  })

  const templatesData = templates.map((t) => ({ label: t.name, value: t.id }))

  const currentTemplates = templates.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATES_LIMIT
  const hasContent = Boolean(currentTemplates)

  const hasTemplateId = Boolean(form.values.templateId)
  return (
    <Box maw={500}>

      <Modal opened={opened} onClose={close} title="Create new Template">
        <TemplateForm />
      </Modal>
      {/* {
        // TODO: handle edit template
        hasContent && false &&
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Select
            label="Current Template"
            placeholder="Pick a template"
            data={templatesData}
            {...form.getInputProps("templateId")}
          />
          {

            hasTemplateId &&
            <Button onClick={open}>Edit current template</Button>
          }
        </form>
      } */}
      {/* {
        canCreateTemplate &&
        <Button disabled={!canCreateTemplate} onClick={open}>Add new template</Button>
      } */}
      <Button onClick={open}>Add new template</Button>

      {/* <Overlay color="#000" backgroundOpacity={0.35} blur={8} /> */}
    </Box>
  )
}

export default GeneralSetting