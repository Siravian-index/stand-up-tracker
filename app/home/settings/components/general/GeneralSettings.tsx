"use client"

import { Box, Flex, Group, Select } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { TemplateType } from "@/schema/template";
import { useForm } from "@mantine/form";
import { MAX_TEMPLATE_LIMIT } from "@/lib/errors/TemplateLimit";
import { useState } from "react";

interface Props {
  templates: TemplateType[]
}

export type Action = "ADD" | "UPDATE" | "REMOVE"

const GeneralSetting = ({ templates }: Props) => {
  const [templatesData, setTemplatesData] = useState(() => templates.map((t) => ({ label: t.name, value: t.id })))
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

  const updateTemplateToSelect = (template: { label: string, value: string }, action: Action) => {
    if (action === "ADD") {
      setTemplatesData((prev) => [...prev, template])
      form.setFieldValue("templateId", template.value)
    }
    if (action === "UPDATE") {
      setTemplatesData((prev) => prev.map((t) => t.value === template.value ? template : t))
      form.setFieldValue("templateId", template.value)

    }
    if (action === "REMOVE") {
      setTemplatesData((prev) => prev.filter((t) => t.value !== template.value))
      form.setFieldValue("templateId", "")
    }
  }


  const currentTemplates = templatesData.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATE_LIMIT
  const hasContent = Boolean(currentTemplates)
  const hasTemplateId = Boolean(form.values.templateId)
  const formTitle = hasTemplateId ? "Update Template" : "Create new Template"
  return (
    <>

      <TemplateForm
        templateId={form.values.templateId}
        updateTemplateToSelect={updateTemplateToSelect}
        isModalOpen={opened}
        closeModal={close}
      />
      <Flex
        justify="center"
        direction="column"
        mt="md"
      >

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
      </Flex>
      <Group mt="md">
        {
          canCreateTemplate &&
          <Button disabled={!canCreateTemplate} onClick={handleCreateTemplateClick}>Add new template</Button>
        }
        {
          hasTemplateId &&
          <Button onClick={open}>Edit current template</Button>
        }
      </Group>
    </>

  )
}

export default GeneralSetting