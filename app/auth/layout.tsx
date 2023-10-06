import React from "react"

interface Props {
  children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {



  return (
    <>
      <nav>
        <span>test</span>
      </nav>
      {children}
    </>
  )
}

export default AuthLayout