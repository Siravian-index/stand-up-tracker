
"use client"
import React from 'react';

import Navbar from './components/Navbar';


interface Props {
  children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}


export default HomeLayout