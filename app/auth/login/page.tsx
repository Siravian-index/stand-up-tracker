import { Box, Flex, Title } from "@mantine/core"
import SignInForm from "./components/SignIn"


const LoginPage = () => {

  return (
    <Flex
      h="100vh"
      justify="center"
      align="center"
    >
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="1.7rem"
      >
        <Title>Login</Title>
        <SignInForm />
      </Flex>
    </Flex>
  )
}

export default LoginPage