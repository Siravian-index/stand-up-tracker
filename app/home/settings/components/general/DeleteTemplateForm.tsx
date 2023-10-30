import { TemplateService } from "@/utils/http/templates/templateService";
import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";


interface Props {
    templateId: string
    templateName: string
    removeTemplate: (templateId: string) => void
}


export default function DeleteTemplateForm({ templateId, templateName, removeTemplate }: Props) {
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
            const { success, data } = await res.json()
            const id = z.object({
                id: z.string()
            })
            const template = id.parse(data)
            return { success, msg: "Deleted Successfully", data: template }
        } catch (error) {
            return { success: false, msg: "Failed to delete, try again" }
        }
    }

    const handleSubmit = async (templateToDelete: string) => {
        const isValid = validateTemplateNames(templateName, templateToDelete)
        if (!isValid) {
            return
        }
        const { success, msg, data } = await deleteTemplate(templateId)
        if (success && data) {
            removeTemplate(data.id)
        }
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
                    <Button color="red" type="submit">
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