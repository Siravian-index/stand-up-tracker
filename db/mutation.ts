import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
import { Validator } from "@/lib/errors/ValidateError"
import { newTemplateType } from "@/schema/template"


const createTemplate = async (payload: newTemplateType) => {
    const mutation = {
        data: {
            userEmail: "placeholder@gmail.com",
            Template: {
                create: {
                    name: "Placeholder_template_name",
                    Participant: {
                        createMany: { data: [{ name: "david_placeholder", hasParticipated: false }] }
                    },
                    Timebox: { create: { time: 90 } }
                }
            }
        }
    }
    try {
        const [sessionErr, email] = await getSessionEmail()
        if (sessionErr) {
            throw sessionErr
        }
        // prisma.settings.upsert({
        //     where: {
        //         userEmail: email,
        //     },
        //     update: {

        //     },
        //     create: {
        //     }
        // })
        
        
    } catch (error) {
        return Validator.validateErrorOrRedirect(error)
    }
}