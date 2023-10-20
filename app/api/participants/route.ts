import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
import { MAX_TEMPLATE_LIMIT, TemplateLimitReached } from "@/lib/errors/TemplateLimit"
import { newTemplateSchema, updateTemplateSchema } from "@/schema/template"
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

        if (currentTemplates >= MAX_TEMPLATE_LIMIT) {
            throw new TemplateLimitReached()
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

        return new Response(JSON.stringify({ user, template }))

    } catch (error) {
        if (error instanceof TemplateLimitReached) {
            return new Response(JSON.stringify({ test: "pong" }))
        }
        console.error("failed prisma create: ")
        console.error(error)
        return new Response(JSON.stringify({ test: "pong" }))

    }

}


export async function PUT(request: NextRequest) {
    try {
        const payload = await request.json()
        const templateData = updateTemplateSchema.parse(payload)
        const email = await getSessionEmail()

        const currentTemplate = await prisma.template.findUniqueOrThrow({
            where: {
                id: templateData.templateId
            },
            include: {
                Participant: true,
                Timebox: true
            }
        })

        await prisma.template.update({
            where:{
                id: templateData.name
            },
            data: {
                name: templateData.name,
                Timebox: {
                    update: {
                        where: {
                            id: currentTemplate.Timebox?.id
                        },
                         data: {
                            time: templateData.time
                         }
                    }
                }
            }
        })
       
        

        


    } catch (error) {
        return new Response(JSON.stringify({ test: "pong" }))
    }
}