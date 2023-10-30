"use client"

import { signIn } from "next-auth/react"
import { FormEvent } from "react"
import GoogleButton from "./GoogleButton"


const SignInForm = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const homePage = "/home/daily"
    e.preventDefault()
    try {
      await signIn("google", {
        redirect: false,
        callbackUrl: homePage
      })
    } catch (error) {
      console.error("Failed when trying to log in with google")
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <GoogleButton/>
      </form>
    </section>
  )

}

export default SignInForm