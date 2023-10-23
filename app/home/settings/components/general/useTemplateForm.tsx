import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { NewTemplateType, UpdateTemplateType, newTemplateSchema, updateTemplateSchema } from '@/schema/template';
import { useEffect, useState } from 'react';
import { TemplateService } from '@/utils/http/templates/templateService';


interface Props {
    templateId: string
}

type Template = NewTemplateType | UpdateTemplateType

export const useTemplateForm = ({ templateId }: Props) => {
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
            const service = new TemplateService()
            const res = await service.get(`?templateId=${templateId}`)
            const { success, data } = await res.json()
            if (!success) {
                throw new Error("Failed to load information")
            }
            const template = updateTemplateSchema.parse(data)
            form.setValues(template)
        } catch (error) {
            console.error(error)
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
                placeholder="Ana Maria"
                style={{ flex: 1 }}
                {...form.getInputProps(`participants.${index}.name`)}
            />
            <Group mt="1.5rem">
                <Switch
                    label="Active"
                    {...form.getInputProps(`participants.${index}.hasParticipated`, { type: 'checkbox' })}
                />
                <ActionIcon color="red" onClick={() => onRemoveParticipant(item?.id, index)}>
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
            const payload = newTemplateSchema.parse(values)
            const service = new TemplateService()
            const res = await service.post(payload)
            const data = await res.json()
            console.log(data)
            debugger

            // revalidatePath("page")
            // update select with new name and id
            // update current values with response from db i.e Template id
            // so in the next request it is send as PUT
        } catch (error) {
            // show error message
            console.error(error)
        }
    }

    const updateTemplate = async (values: typeof form.values, participantsIdsToDelete: string[]) => {
        try {
            const template = updateTemplateSchema.parse(values)
            const payload = {
                template,
                participantsIdsToDelete,
            }
            const service = new TemplateService()
            const res = await service.put(payload)
            const data = await res.json()
            console.log(data)
            debugger
        } catch (error) {
            console.error(error)
        }
    }

    return {
        form,
        fields,
        handleInsertListItem,
        handleSubmit,

    }
}