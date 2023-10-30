"use client"

import { Box, Flex, Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

interface Props {
    generalSettingsTab: React.ReactNode
}

const SettingsTabs = ({ generalSettingsTab }: Props) => {
    const iconStyle = { width: "0.75rem", height: "0.75rem" };

    return (
        <Flex
            justify="center"
            align="center"
        >
            <Tabs orientation="horizontal" defaultValue="general" maw={800}>
                <Tabs.List>
                    <Tabs.Tab value="general" leftSection={<IconSettings style={iconStyle} />}>
                        General
                    </Tabs.Tab>
                    <Tabs.Tab value="todo" leftSection={<IconPhoto style={iconStyle} />}>
                        Todo
                    </Tabs.Tab>
                    <Tabs.Tab disabled value="colors" leftSection={<IconMessageCircle style={iconStyle} />}>
                        Colors
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="general">
                    {generalSettingsTab}
                </Tabs.Panel>

                <Tabs.Panel value="todo">
                    Todo tab content
                </Tabs.Panel>

                <Tabs.Panel value="colors">
                    colors content
                </Tabs.Panel>
            </Tabs>
        </Flex>

    )
}


export default SettingsTabs