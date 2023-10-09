
"use client"
import { Select, Text } from "@mantine/core"
import TemplateForm from "./TemplateForm"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';




const GeneralSetting = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Select
        label="Current Template"
        placeholder="Pick a template"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />

      {/* <NamesList list={[]} removeItem={removeFromList} /> */}
      <>
        <Modal opened={opened} onClose={close} title="Create new Template">
          {/* Modal content */}
          <TemplateForm />

        </Modal>

        <Button onClick={open}>Open modal</Button>
      </>
    </>
  )
}

export default GeneralSetting