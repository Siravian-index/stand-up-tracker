import { Flex, Title } from "@mantine/core"
import GeneralSetting from "./components/general/GeneralSettings"


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

    <GeneralSetting/>

    </>
  )
}


export default Settings