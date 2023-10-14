
import { Box, Select } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

interface Props {

}


const MAX_TEMPLATES_LIMIT = 3
const GeneralSetting = ({ }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const templates = [{ label: "Template One", value: "1" }, { label: "Template Two", value: "2" }]
  const currentTemplates = templates.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATES_LIMIT

  return (
    <Box maw={500}>

      <Select
        label="Current Template"
        placeholder="Pick a template"
        data={templates}
      />

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