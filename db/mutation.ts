import prisma from "@/db/prismaClient"
import { Validator } from "@/lib/errors/ValidateError"


const createTemplate = async () => {
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