import { AuthOptions, Session, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from "next/navigation";
import { SessionError } from "./errors/SessionError";



export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ]
}

export const validateAuthSessionServer = async ({ isSessionRequired = true, redirectTo: path, cb }: { isSessionRequired?: boolean, redirectTo: string, cb?: (session: Session) => Promise<void> }) => {
  const session = await getServerSession(authConfig)
  if (isSessionRequired && !session) {
    redirect(path)
  }
  if (!isSessionRequired && session) {
    redirect(path)
  }

  if (isSessionRequired && session && typeof cb === "function") {
    await cb(session)
  }

}

const getServerAuthSession = async () => {
  try {
    const session = await getServerSession(authConfig)
    if (!session) {
      throw new SessionError()
    }
    return session
  } catch (error) {
    console.error(error)
    redirect("/")
  }

}

// const useValidateClientAuth = () => {
//   if (typeof window === "undefined") {
//     return
//   }
//   const session = useSession()
//   const router = useRouter()
//   if (session.status === "unauthenticated") {
//     router.push("/")
//   }
// }

export const getSessionEmail = async () => {
  try {
    const session = await getServerAuthSession()
    const email = session.user?.email
    if (!email) {
      throw new SessionError()
    }
    return email
  } catch (error) {
    console.error(error)
    redirect("/")
  }
}