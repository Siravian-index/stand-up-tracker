import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { NewTemplateType, UpdateTemplateType, newTemplateSchema, updateTemplateSchema } from '@/schema/template';
import { useEffect, useRef, useState } from 'react';
import { TemplateService } from '@/utils/http/templates/templateService';
import { Action } from './GeneralSettings';


interface Props {
    templateId: string
    updateTemplateToSelect: (template: { label: string, value: string }, action: Action) => void

}

type Template = NewTemplateType | UpdateTemplateType

export const useTemplateForm = ({ templateId, updateTemplateToSelect }: Props) => {
    const templateNameRef = useRef("")
    const [loadingForm, setLoadingForm] = useState(false)
    const [participantsIdsToDelete, setParticipantsIdsToDelete] = useState<string[]>([])
    const form = useForm<Template>({
        initialValues: {
            participants: [],
            name: '',
            time: 90,
        },
        validate: zodResolver(newTemplateSchema)
    })

    useEffect(() => {
        getTemplateById(templateId)
    }, [templateId])

    const getTemplateById = async (id: string) => {
        if (!id) {
            return
        }
        try {
            setLoadingForm(true)
            const service = new TemplateService()
            const res = await service.get(`?templateId=${templateId}`)
            const { success, data } = await res.json()
            if (!success) {
                throw new Error("Failed to load information")
            }
            const template = updateTemplateSchema.parse(data)
            templateNameRef.current = template.name
            form.setValues(template)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingForm(false)
        }

    }

    const onRemoveParticipant = (id: string | undefined, index: number) => {
        form.removeListItem('participants', index)
        if (id) {
            setParticipantsIdsToDelete((prev) => [...prev, id])
        }
    }


    const fields = form.values.participants.map((item, index) => (
        <Group key={item.id} mt="xs">
            <TextInput
                label={`Participant ${index + 1}`}
                description="Participant's name"
                placeholder="Ana Maria"
                style={{ flex: 1 }}
                {...form.getInputProps(`participants.${index}.name`)}
                disabled={loadingForm}
                onBlur={() => form.validate()}
            />
            <Group mt="1.5rem">
                <Switch
                    label="Active"
                    {...form.getInputProps(`participants.${index}.hasParticipated`, { type: 'checkbox' })}
                    disabled={loadingForm}
                />
                <ActionIcon
                    color="red"
                    disabled={loadingForm}
                    onClick={() => onRemoveParticipant(item?.id, index)}>
                    <IconTrash size={20} />
                </ActionIcon>
            </Group>
        </Group>
    ));

    const handleInsertListItem = () => {
        const MAX_SIZE = 15
        const currentParticipants = form.values.participants.length
        if (currentParticipants < MAX_SIZE) {
            form.insertListItem('participants', { name: '', hasParticipated: false, id: randomId() })
        }
    }

    const handleSubmit = async (values: typeof form.values) => {
        if (!templateId) {
            return await createTemplate(values)
        }
        return await updateTemplate(values, participantsIdsToDelete)
    }

    const createTemplate = async (values: typeof form.values) => {
        try {
            setLoadingForm(true)
            const payload = newTemplateSchema.parse(values)
            const service = new TemplateService()
            const res = await service.post(payload)
            const { data } = await res.json()
            const template = updateTemplateSchema.parse(data)
            updateTemplateToSelect({ label: template.name, value: template.templateId }, "ADD")
            form.setValues(template)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingForm(false)
        }
    }

    const updateTemplate = async (values: typeof form.values, participantsIdsToDelete: string[]) => {
        try {
            setLoadingForm(true)
            const template = updateTemplateSchema.parse(values)
            const payload = {
                template,
                participantsIdsToDelete,
            }
            const service = new TemplateService()
            const res = await service.put(payload)
            const { data, success } = await res.json()
            const updatedTemplate = updateTemplateSchema.parse(data)
            form.setValues(updatedTemplate)
            updateTemplateToSelect({ label: updatedTemplate.name, value: updatedTemplate.templateId }, "UPDATE")
            setParticipantsIdsToDelete([])
        } catch (error) {

            console.error(error)
        } finally {
            setLoadingForm(false)
        }
    }

    return {
        form,
        fields,
        handleInsertListItem,
        handleSubmit,
        templateName: templateNameRef.current,
        loading: loadingForm,
    }
}