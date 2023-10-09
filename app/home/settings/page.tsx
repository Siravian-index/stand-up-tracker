import { Flex, Title } from "@mantine/core"

import SettingsTabs from "./components/SettingsTabs";
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

      <SettingsTabs />
    </>
  )
}


export default Settings