import prisma from "@/db/prismaClient"
import { getSessionEmail } from "./query"


const createTemplate = async () => {
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
        
    }
}