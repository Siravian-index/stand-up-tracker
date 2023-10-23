import { TemplateService } from "@/utils/http/templates/templateService";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";


interface Props {
    templateId: string
    templateName: string
}


export default function DeleteTemplateForm({ templateId, templateName }: Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            templateToDelete: "",
        }
    })


    const deleteTemplate = async (templateId: string) => {
        try {
            const service = new TemplateService()
            const res = await service.delete({ templateId })
            debugger
            return { success: true, msg: "Deleted Successfully" }
        } catch (error) {
            console.error(error)
            return { success: true, msg: "Failed to delete, try again" }
        }
    }

    const handleSubmit = async (templateToDelete: string) => {
        const isValid = validateTemplateNames(templateName, templateToDelete)
        if (!isValid) {
            return
        }
        const { success, msg } = await deleteTemplate(templateId)
        // show some msg to user
    }

    const validateTemplateNames = (originalTemplateName: string, userInputTemplateName: string) => {
        return originalTemplateName === userInputTemplateName
    }


    return (
        <>
            <Modal opened={opened} onClose={close} title={`Deleting "${templateName}".`}>
                <form onSubmit={form.onSubmit(({ templateToDelete }) => handleSubmit(templateToDelete))}>
                    <TextInput
                        label="Type template's name to delete"
                        placeholder={templateName}
                        withAsterisk
                        {...form.getInputProps("templateToDelete")}
                    />
                    <Button color="red">
                        Delete Template
                    </Button>
                </form>
            </Modal>

            <Button color="red" onClick={open}>
                Danger Zone
            </Button>
        </>
    )
}