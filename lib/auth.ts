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

export const useServerSession = () => {
  return getServerSession(authConfig)
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
  const session = await useServerSession()
  const email = session?.user?.email
  if (!email) {
      const err = new SessionError("Email not found in Session (Auth)")
      return [err, null] as const
  }
  return [null, email] as const
}