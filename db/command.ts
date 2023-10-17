import prisma from "@/db/prismaClient"
import { getSessionEmail } from "./query"


const createTemplate = async () => {
    try {
        const [sessionErr, email] = await getSessionEmail()
        if (sessionErr) {
            throw sessionErr
        }
        
        
    } catch (error) {
        
    }
}