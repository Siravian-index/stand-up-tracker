import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { NewTemplateType, UpdateTemplateType, newTemplateSchema, updateTemplateSchema } from '@/schema/template';
import { useEffect } from 'react';
import { TemplateService } from '@/utils/http/templates/templateService';


interface Props {
    templateId: string
}

export const useTemplateForm = ({ templateId }: Props) => {
    const form = useForm<NewTemplateType | UpdateTemplateType>({
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
            debugger
            if (!success) {
                throw new Error("Failed to load information")
            }
            const template = updateTemplateSchema.parse(data)
            form.setValues(template)
        } catch (error) {
            console.error(error)
        }

    }



    const fields = form.values.participants.map((item, index) => (
        <Group key={randomId()} mt="xs">
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
                <ActionIcon color="red" onClick={() => form.removeListItem('participants', index)}>
                    <IconTrash size={20} />
                </ActionIcon>
            </Group>
        </Group>
    ));

    const handleInsertListItem = () => {
        const MAX_SIZE = 15
        const currentParticipants = form.values.participants.length
        if (currentParticipants < MAX_SIZE) {
            form.insertListItem('participants', { name: '', hasParticipated: false })
        }
    }

    return {
        form,
        fields,
        handleInsertListItem,

    }
}