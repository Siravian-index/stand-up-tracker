import { Flex, Title } from "@mantine/core"

import SettingsTabs from "./components/SettingsTabs";
import GeneralSettingsTab from "./components/general/GeneralSettingsTab";
import { getTemplates } from "@/db/query";
const Settings = async () => {
  const tuple = await getTemplates()
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
        settingsTab={<GeneralSettingsTab tuple={tuple}/>}
      />        
    </>
  )
}


export default Settings