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

export const useServerAuth = async () => {
  const session = await getServerSession(authConfig)
  if (!session) {
    redirect("/")
  }
}

export const useClientAuth = () => {
  if (typeof window !== "undefined") {
    const session = useSession()
    const router = useRouter()
    debugger
    if (session.status === "unauthenticated") {
      router.push("/")
    }
  }
}