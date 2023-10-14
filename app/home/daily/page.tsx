
import { Flex, Title } from "@mantine/core";
import TemplateList from "./components/templates/TemplateList";

const Dashboard = () => {


  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <p>static page</p>

        <TemplateList />
      </Flex>
    </>
  )
}

export default Dashboard