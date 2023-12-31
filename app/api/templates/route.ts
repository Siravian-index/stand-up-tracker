import prisma from "@/db/prismaClient"
import { getSessionEmail } from "@/lib/auth"
import { MAX_TEMPLATE_LIMIT, TemplateLimitReached } from "@/lib/errors/TemplateLimit"
import { ParticipantType } from "@/schema/participant"
import { newTemplateSchema, updateTemplateSchema } from "@/schema/template"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const queryId = url.searchParams.get("templateId")

    try {
        const templateId = z.string().parse(queryId)
        const template = await prisma.template.findUniqueOrThrow({
            where: {
                id: templateId
            },
            select: {
                id: true,
                name: true,
                Participant: {
                    select: {
                        hasParticipated: true,
                        id: true,
                        name: true,
                    }
                },
                Timebox: {
                    select: {
                        time: true
                    }
                }
            }
        })

        const data = {
            templateId: template.id,
            name: template.name,
            participants: template.Participant,
            time: template.Timebox?.time
        }
        const payload = { data, success: true }
        return Response.json(payload)
    } catch (error) {
        console.error(error)
        return Response.json({ success: false }, { status: 400 })
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const newTemplate = newTemplateSchema.parse(body)
        const email = await getSessionEmail()
        const data = await prisma.$transaction(async (thread) => {
            const user = await thread.user.upsert({
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

            const currentTemplates = await thread.template.count({
                where: {
                    settingsId
                },
            })

            if (currentTemplates >= MAX_TEMPLATE_LIMIT) {
                throw new TemplateLimitReached()
            }

            const stripParticipantsIds = newTemplate.participants.map(({ id, ...rest }) => ({ ...rest }))
            const template = await thread.template.create({
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
                            data: stripParticipantsIds
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    Participant: {
                        select: {
                            hasParticipated: true,
                            id: true,
                            name: true,
                        }
                    },
                    Timebox: {
                        select: {
                            time: true
                        }
                    }
                }
            })
            const data = {
                templateId: template.id,
                name: template.name,
                participants: template.Participant,
                time: template.Timebox?.time
            }
            return data
        })
        const payload = { data, success: true }
        return Response.json(payload, { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ success: false }), { status: 400 })
    }
}


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const templateData = updateTemplateSchema.parse(body.template)
        const participantsIdsToDelete = z.string().array().parse(body.participantsIdsToDelete)
        const email = await getSessionEmail()
        const data = await prisma.$transaction(async (thread) => {
            const currentTemplate = await thread.template.findUniqueOrThrow({
                where: {
                    id: templateData.templateId
                },
                select: {
                    id: true,
                    Timebox: {
                        select: {
                            id: true
                        }
                    }
                }
            })

            const timeboxId = z.string().parse(currentTemplate.Timebox?.id)

            // delete participants
            const promiseParticipantDeleteList = participantsIdsToDelete.map((id) => {
                return thread.participant.delete({
                    where: {
                        id,
                    }
                })
            })
            await Promise.all(promiseParticipantDeleteList)

            // update or create each participant
            const promiseParticipantUpdatedList = templateData.participants.map((participant) => {
                return thread.participant.upsert(({
                    where: {
                        id: participant.id
                    },
                    update: {
                        name: participant.name,
                        hasParticipated: participant.hasParticipated
                    },
                    create: {
                        templateId: currentTemplate.id,
                        name: participant.name,
                        hasParticipated: participant.hasParticipated
                    },
                }))
            })

            await Promise.all(promiseParticipantUpdatedList)


            const updatedTemplate = await thread.template.update({
                where: {
                    id: currentTemplate.id
                },
                data: {
                    name: templateData.name,
                    Timebox: {
                        update: {
                            where: {
                                id: timeboxId,
                            },
                            data: {
                                time: templateData.time
                            }
                        }
                    },
                },
                select: {
                    id: true,
                    name: true,
                    Participant: {
                        select: {
                            hasParticipated: true,
                            id: true,
                            name: true,
                        }
                    },
                    Timebox: {
                        select: {
                            time: true
                        }
                    }
                }
            })
            const data = {
                templateId: updatedTemplate.id,
                name: updatedTemplate.name,
                participants: updatedTemplate.Participant,
                time: updatedTemplate.Timebox?.time
            }
            return data
        },
            {
                isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
                maxWait: 30000, // default: 2000
                timeout: 30000, // default: 5000
            })
        const payload = { data, success: true }
        return Response.json(payload)
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false }), { status: 400 })
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()
        const { templateId } = z.object({ templateId: z.string() }).parse(body)
        const email = await getSessionEmail()
        const data = await prisma.template.delete({
            where: {
                id: templateId
            }
        })
        const payload = { data, success: true }
        return Response.json(payload)
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 })
    }
}