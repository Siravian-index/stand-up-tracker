
import { Flex, Title } from "@mantine/core";
import Countdown from "./components/Countdown"
import ParticipantList from "./components/participants/ParticipantList";

const Dashboard = () => {

  const time = new Date();
  time.setSeconds(time.getSeconds() + 90)


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
      {/* <Countdown settings={{ expiryTimestamp: time, autoStart: false }} /> */}

      <ParticipantList />
    </>
  )
}

export default Dashboard