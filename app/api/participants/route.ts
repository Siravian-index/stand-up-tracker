import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
import { newTemplateSchema } from "@/schema/template"
import { NextRequest } from "next/server"
import { z } from "zod"


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
        const newTemplate = newTemplateSchema.parse(payload)
        // move this to mutations
        const email = await getSessionEmail()
        const user = await prisma.user.upsert({
            where: {
                email,
            },
            update: {},
            create: {
                email,
                settings: {
                    create: {}
                }
            },
            include: {
                settings: {
                    select: {
                        id: true
                    }
                }
            }
        })

        const settingsId = z.string().parse(user.settings?.id)

        const currentTemplates = await prisma.template.count({
            where: {
                settingsId
            },
        })

        if (currentTemplates >= 3) {
            throw new Error("Max Templates limit reached");
        }

        const template = await prisma.template.create({
            data: {
                settingsId,
                name: newTemplate.name,
                Timebox: {
                    create: {
                        time: newTemplate.time
                    }
                },
                Participant: {
                    createMany: {
                        data: newTemplate.participants
                    }
                }
            },
            include: {
                Participant: true,
                Timebox: true,
            }
        })

        return new Response(JSON.stringify({user, template}))

    } catch (error) {
        console.error("failed prisma create: ")
        console.error(error)
        return new Response(JSON.stringify({ test: "pong" }))

    }

}