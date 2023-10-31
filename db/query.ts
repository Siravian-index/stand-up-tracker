import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
import { PrismaResourceNotFound } from "@/lib/errors/PrismaErrors"
import { Validator } from "@/lib/errors/ValidateError"



const getSettings = async (userEmail: string) => {
    const settings = await prisma.settings.findUnique({ where: { userEmail }, include: { Template: {} } })
    if (!settings) {
        throw new PrismaResourceNotFound(`Settings not found for user: ${userEmail}`)
    }
    return settings
}

const getTemplate = async (id: string) => {
    const template = await prisma.template.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            Participant: {
                select: {
                    id: true,
                    name: true,
                    hasParticipated: true,
                    templateId: true,
                }
            },
            Timebox: {
                select: {
                    time: true
                }
            }
        }
    })
    if (!template) {
        throw new PrismaResourceNotFound(`Template not found, looking for id: ${id}`)

    }
    return template
}

export const getTemplates = async () => {
    try {
        const email = await getSessionEmail()
        const settings = await getSettings(email)
        return [null, settings.Template] as const
    } catch (error) {
        return Validator.validateErrorOrRedirect(error)
    }
}

// id = UUID
export const getTemplateById = async (id: string) => {

    try {
        await getSessionEmail()

        const template = await getTemplate(id)

        return [null, template] as const
    } catch (error) {
        return Validator.validateErrorOrRedirect(error)
    }
}
