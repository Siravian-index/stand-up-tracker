import prisma from "@/db/prismaClient"
import { useServerSession } from "@/lib/auth"
import { PrismaResourceNotFound } from "@/lib/errors/PrismaErrors"
import { SessionError } from "@/lib/errors/SessionError"
import { UnknownError } from "@/lib/errors/UnknownError"
import { TemplateType } from "@/schema/template"

const getSession = async () => {
    const session = await useServerSession()
    const email = session?.user?.email
    if (!email) {
        const err = new SessionError("Email not found in Session (Auth)")
        return [err, null] as const
    }
    return [null, email] as const
}

const getSettings = async (userEmail: string) => {
    const settings = await prisma.settings.findUnique({ where: { userEmail }, include: { Template: {} } })
    if (!settings) {
        const err = new PrismaResourceNotFound(`Settings not found for user: ${userEmail}`);
        return [err, null] as const
    }
    return [null, settings] as const
}


export const getTemplates = async (): Promise<readonly [null, TemplateType[]] | readonly [string, null]> => {
    try {
        const [err, email] = await getSession()
        if (err) {
            throw err
        }
        const [prismaErr, settings] = await getSettings(email)
        if (prismaErr) {
            throw prismaErr
        }
        return [null, settings.Template] as const
    } catch (error) {
        console.error(error)
        if (error instanceof SessionError) {
            return [error.message, null] as const
        }
        if (error instanceof PrismaResourceNotFound) {
            return [error.message, null] as const
        }
        const msg = "Unknown error happened while getting templates, please try again later."
        const unknownError = new UnknownError(msg)
        return [unknownError.message, null] as const
    }
}

const result = { success: true, data: [], error: null }
