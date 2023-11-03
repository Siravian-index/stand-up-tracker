import { templateSchema } from "@/schema/template";
import { TemplateService } from "@/utils/http/templates/templateService";
import { Box, Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Action } from "./GeneralSettings";


interface Props {
    templateId: string
    templateName: string
    updateTemplateToSelect: (template: { label: string, value: string }, action: Action) => void
    onDelete: () => void
}


export default function DeleteTemplateForm({ templateId, templateName, updateTemplateToSelect, onDelete }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            templateToDelete: "",
        }
    })


    const deleteTemplate = async (templateId: string) => {
        try {
            setIsLoading(true)
            const service = new TemplateService()
            const res = await service.delete({ templateId })
            const { data } = await res.json()
            const template = templateSchema.omit({createdAt: true, updatedAt: true}).parse(data)
            updateTemplateToSelect({ label: template.name, value: template.id }, "REMOVE")
            close()
            onDelete()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (templateToDelete: string) => {
        const isValid = validateTemplateNames(templateName, templateToDelete)
        if (!isValid) {
            form.setFieldError("templateToDelete", "Name must match template's name")
            return
        }
        await deleteTemplate(templateId)
    }

    const validateTemplateNames = (originalTemplateName: string, userInputTemplateName: string) => {
        return originalTemplateName === userInputTemplateName
    }


    return (
        <>
            <Modal opened={opened} onClose={close} title={`Deleting "${templateName}".`}>
                <LoadingOverlay
                    visible={isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <form onSubmit={form.onSubmit(({ templateToDelete }) => handleSubmit(templateToDelete))}>
                    <TextInput
                        label="Type template's name to delete"
                        placeholder={templateName}
                        withAsterisk
                        disabled={isLoading}
                        {...form.getInputProps("templateToDelete")}
                    />
                    <Button color="red" type="submit" disabled={isLoading}>
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