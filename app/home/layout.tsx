
"use client"

import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar';


interface Props {
  children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {

  return (
    <>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </>
  )
}


export default HomeLayout