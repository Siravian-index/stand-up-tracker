import { Notification } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX, IconCheck } from '@tabler/icons-react';

type Type = "SUCCESS" | "ERROR"
interface Props {
    title: string
    content: string
    type: Type
    show: boolean
}


export default function SettingsNotification({ title, content, show, type }: Props) {
    const [display, { close }] = useDisclosure(show)
    const xIcon = <IconX style={{ width: "1.25rem", height: "1.25rem" }} />;
    const checkIcon = <IconCheck style={{ width: "1.25rem", height: "1.25rem" }} />;

    const icon = type === "SUCCESS" ? checkIcon : xIcon
    const color = type === "SUCCESS" ? "green" : "red"
    return (
        <>
            {
                display && (
                    <Notification icon={icon} color={color} title={title} onClose={close}>
                        {content}
                    </Notification>
                )
            }
        </>
    )
}