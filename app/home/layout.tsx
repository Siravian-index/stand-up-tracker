

import { validateAuthSessionServer } from '@/lib/auth';
import Navbar from './components/Navbar';
import prisma from '@/db/prismaClient';
import { Session } from 'next-auth';


interface Props {
  children: React.ReactNode
}

const validationCallback = async (session: Session) => {
  // try {
  //   const email = session.user?.email
  //   if (!email) {
  //     throw new Error("Email not found in session obj");

  //   }
  //   const defaultTemplates = [{ name: "Default Template 1" }, { name: "Default Template 2" }, { name: "Default Template 3" }]

  //   const upsertUser = await prisma.user.upsert({
  //     include: {
  //       settings: { include: { Template: {}} }
  //     },
  //     where: {
  //       email
  //     },
  //     update: {},
  //     create: {
  //       email,
  //       settings: { create: { Template: { createMany: { data: defaultTemplates } } } }
  //     },
  //   })
  // } catch (error) {
  //   console.log(error)
  //   console.error("Failed prisma fetch on validationCallback")
  // }

}

const HomeLayout = async ({ children }: Props) => {

  await validateAuthSessionServer({ redirectTo: "/", cb: validationCallback })
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}


export default HomeLayout