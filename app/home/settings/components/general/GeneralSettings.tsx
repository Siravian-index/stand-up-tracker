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

export type Action = "ADD" | "UPDATE"

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
    }
    if (action === "UPDATE") {
      setTemplatesData((prev) => prev.map((t) => t.value === template.value ? template : t))
    }
  }

  const removeTemplateFromSelect = (templateId: string) => {
    setTemplatesData((prev) => prev.filter((t) => t.value !== templateId))
    form.setFieldValue("templateId", "")
  }


  const currentTemplates = templatesData.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATE_LIMIT
  const hasContent = Boolean(currentTemplates)
  const hasTemplateId = Boolean(form.values.templateId)
  const formTitle = hasTemplateId ? "Update Template" : "Create new Template"
  return (
    <Flex
      justify="center"
    >

      <Modal opened={opened} onClose={close} title={formTitle}>
        <TemplateForm
          templateId={form.values.templateId}
          updateTemplateToSelect={updateTemplateToSelect}
          removeTemplate={removeTemplateFromSelect}
        />
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
      <Group mt="md">
        {
          hasTemplateId &&
          <Button onClick={open}>Edit current template</Button>
        }
        {
          canCreateTemplate &&
          <Button disabled={!canCreateTemplate} onClick={handleCreateTemplateClick}>Add new template</Button>
        }
      </Group>
    </Flex>
  )
}

export default GeneralSetting