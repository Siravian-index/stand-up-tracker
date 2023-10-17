import { Flex, Title } from "@mantine/core"

import SettingsTabs from "./components/SettingsTabs";
import GeneralSettingsTab from "./components/general/GeneralSettingsTab";
const Settings = () => {
  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="center"
      >
        <Title>Settings</Title >
      </Flex>

      <SettingsTabs
        generalSettingsTab={<GeneralSettingsTab />}
      />
    </>
  )
}


export default Settings