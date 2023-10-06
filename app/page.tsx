import { validateAuthSessionServer } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"




const Home = async () => {
  const signInPageURL = "/auth/login"
  // add some logo or landing page later
  // then a Link to the sign in form
  // const session = await useServerAuthSession()
  await validateAuthSessionServer({isSessionRequired: false, redirectTo: "/home/daily"})
  // if (session) {
  //   redirect("/home/daily")
  // }
  return (
    <>
      <h1>Welcome back</h1>
      <p>Please log in</p>
      <Link href={signInPageURL}>Go to sign in</Link>
    </>
  )
}

export default Home