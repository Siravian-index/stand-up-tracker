import prisma from "@/db/prismaClient"
import { NextRequest } from "next/server"


export async function GET() {
    // console.log(request.body)

    const data = { ping: "pong" }

    return Response.json({ data })
}

export async function POST(request: NextRequest) {
    // receive formatted payload
    // search (upsert) for settings using email
    // validate payload (zod)
    // create resource (template)



    
    const data = { ping: "POST", }
    return Response.json({ data })
}