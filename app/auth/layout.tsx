import { validateAuthSessionServer } from "@/lib/auth"
import React from "react"

interface Props {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {

  await validateAuthSessionServer({ isSessionRequired: false, redirectTo: "/home/daily" })

  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout