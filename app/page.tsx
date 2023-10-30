import { validateAuthSessionServer } from "@/lib/auth"
import { Flex, Text, Title } from "@mantine/core"
import Link from "next/link"




const Home = async () => {
  const signInPageURL = "/auth/login"
  // add some logo or landing page later
  // then a Link to the sign in form
  // const session = await useServerAuthSession()
  await validateAuthSessionServer({ isSessionRequired: false, redirectTo: "/home/daily" })
  // if (session) {
  //   redirect("/home/daily")
  // }
  return (
    <Flex
      justify="center"
      align="center"
      h="100vh"
    >
      <Flex
        align="center"
        direction="column"
      >
        <Title>Welcome back</Title>
        <Text>Please log in</Text>
        <Link href={signInPageURL}>Go to sign in</Link>
      </Flex>
    </Flex>

  )
}

export default Home