import Link from "next/link"




const Home = () => {

  // add some logo or landing page later
  // then a Link to the sign in form
  const signInPageURL = "/auth/login"
  return (
    <>
      <h1>Welcome back</h1>
      <p>Please log in</p>
      <Link href={signInPageURL}>Go to sign in</Link>
    </>
  )
}

export default Home