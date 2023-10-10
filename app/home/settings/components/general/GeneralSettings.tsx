
import { Select, Text } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

interface Props {

}


const MAX_TEMPLATES_LIMIT = 3
const GeneralSetting = ({}: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const templates = ["Template One", "Template Two"]
  const currentTemplates = templates.length
  const canCreateTemplate = currentTemplates < MAX_TEMPLATES_LIMIT

  return (
    <>
      <Select
        label="Current Template"
        placeholder="Pick a template"
        data={templates}
      />

      <>
        <Modal opened={opened} onClose={close} title="Create new Template">
          <TemplateForm />
        </Modal>
        <Button disabled={!canCreateTemplate} onClick={open}>Open modal</Button>
      </>
    </>
  )
}

export default GeneralSetting