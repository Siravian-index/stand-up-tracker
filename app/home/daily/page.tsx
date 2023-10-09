
import { Flex, Title } from "@mantine/core";
import Countdown from "./components/Countdown"
import ParticipantList from "./components/participants/ParticipantList";

const Dashboard = () => {


  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="center"
        direction="column"
      >
        <Title>Daily Stand-up</Title >

      </Flex>
      <Countdown />

      <ParticipantList />
    </>
  )
}

export default Dashboard