import prisma from "@/db/prismaClient"
import { useServerSession } from "@/lib/auth"
import { PrismaResourceNotFound } from "@/lib/errors/PrismaErrors"
import { SessionError } from "@/lib/errors/SessionError"
import { UnknownError } from "@/lib/errors/UnknownError"
import { TemplateType, templateListSchema } from "@/schema/template"

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
    const settings = await prisma.settings.findUnique({ where: { userEmail}, include: { Template: {} } })
    if (!settings) {
        const err = new PrismaResourceNotFound(`Settings not found for user: ${userEmail}`);
        return [err, null] as const
    }
    return [null, settings] as const
}


export const getTemplates = async () => {
    try {
        const [err, email] = await getSession()
        if (err) {
            throw err
        }
        const [prismaErr, settings] = await getSettings(email)
        if (prismaErr) {
            throw prismaErr
        }
        return settings.Template
    } catch (error) {
        console.error(error)
        // check instance of error
        throw new UnknownError()
    }
}

const result = {success: true, data: [], error: null}
