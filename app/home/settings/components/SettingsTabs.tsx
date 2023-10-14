"use client"

import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import GeneralSettingsTab from './general/GeneralSettingsTab';

const SettingsTabs = () => {
    const iconStyle = { width: "0.75rem", height: "0.75rem" };

    return (
        <Tabs orientation="horizontal" defaultValue="general">
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
                <GeneralSettingsTab />
            </Tabs.Panel>

            <Tabs.Panel value="todo">
                Todo tab content
            </Tabs.Panel>

            <Tabs.Panel value="colors">
                colors content
            </Tabs.Panel>
        </Tabs>
    )
}


export default SettingsTabs