"use client"

import { signIn } from "next-auth/react"
import { FormEvent } from "react"
import GoogleButton from "react-google-button"


const SignInForm = () => {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signIn("google", {
        redirect: false,
        callbackUrl: "/home/daily"
      })
    } catch (error) {
      console.error("Failed when trying to log in with google")
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <GoogleButton />
      </form>
    </section>
  )

}

export default SignInForm