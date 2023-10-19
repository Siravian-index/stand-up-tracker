import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
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
    try {
        const payload = await request.json()

        delete payload.participants[0].key
        delete payload.participants[1].key

        console.log(payload)
        const email = await getSessionEmail()

        const test = await prisma.user.create({
            data: {
                email,
                settings: {
                    create: {
                        Template: {
                            create: [{
                                name: payload.name,
                                Participant: {
                                    create: payload.participants
                                },
                                Timebox: {
                                    create: {
                                        time: payload.time
                                    }
                                }
                            }]
                        }
                    }
                }
            }
        })
        console.log(JSON.stringify(test, null, 4))
        return new Response(JSON.stringify({ test: "pong" }))

    } catch (error) {
        console.error("failed prisma create: ")
        console.error(error)
        return new Response(JSON.stringify({ test: "pong" }))

    }

}