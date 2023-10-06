import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";



export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ]
}

export const useValidateServerAuth = async () => {
  const session = await getServerSession(authConfig)
  if (!session) {
    console.log(session)
    redirect("/")
  }
}

export const useValidateClientAuth = () => {
  if (typeof window === "undefined") {
    return
  }
  const session = useSession()
  const router = useRouter()
  if (session.status === "unauthenticated") {
    router.push("/")
  }
}