

export async function GET() {
    // console.log(request.body)

    const data = { ping: "pong" }

    return Response.json({ data })
}

export async function POST(request: Request) {
    console.log(request.body)

    const data = { ping: "POST", }

    return Response.json({ data })
}