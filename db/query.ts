import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
import { PrismaResourceNotFound } from "@/lib/errors/PrismaErrors"
import { Validator } from "@/lib/errors/ValidateError"



const getSettings = async (userEmail: string) => {
    const settings = await prisma.settings.findUnique({ where: { userEmail }, include: { Template: {} } })
    if (!settings) {
        const err = new PrismaResourceNotFound(`Settings not found for user: ${userEmail}`);
        return [err, null] as const
    }
    return [null, settings] as const
}

const getTemplate = async (id: string) => {
    const template = await prisma.template.findUnique({ where: { id }, include: { Participant: {} } })
    if (!template) {
        const err = new PrismaResourceNotFound(`Template not found, looking for id: ${id}`);
        return [err, null] as const
    }
    return [null, template] as const
}

export const getTemplates = async () => {
    try {
        const [err, email] = await getSessionEmail()
        if (err) {
            throw err
        }
        const [prismaErr, settings] = await getSettings(email)
        if (prismaErr) {
            throw prismaErr
        }
        return [null, settings.Template] as const
    } catch (error) {
        return Validator.validateErrorOrRedirect(error)
    }
}

// id = UUID
export const getTemplateById = async (id: string) => {

    try {
        const [err] = await getSessionEmail()
        if (err) {
            throw err
        }
        const [prismaErr, template] = await getTemplate(id)
        if (prismaErr) {
            throw prismaErr
        }
        return [null, template] as const
    } catch (error) {
        return Validator.validateErrorOrRedirect(error)
    }
}
