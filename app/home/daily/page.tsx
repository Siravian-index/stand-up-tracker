
import { Flex } from "@mantine/core";
import TemplateList from "./components/templates/TemplateList";
import Clock from "../components/Clock";

const Dashboard = () => {


  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <Clock />

        <TemplateList />
      </Flex>
    </>
  )
}

export default Dashboard