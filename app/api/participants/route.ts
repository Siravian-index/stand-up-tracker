import prisma from "@/db/prismaClient"


export async function GET() {
    // console.log(request.body)

    const data = { ping: "pong" }

    return Response.json({ data })
}

export async function POST(request: Request) {
    // receive formatted payload
    // search (upsert) for settings using email
    // validate payload
    // create resource (template)



    
    const data = { ping: "POST", }
    return Response.json({ data })
}