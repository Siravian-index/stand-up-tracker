import prisma from "@/db/prismaClient"
import GeneralSetting from "./GeneralSettings"
import { useServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"


const getTemplates = async () => {
    try {
        const session = await useServerSession()
        console.log({ session })

        if (!session?.user?.email) {
            redirect('/')
        }
        const email = session.user.email
        const res = await prisma.settings.findMany({ where: { userEmail: email }, include: {Template: {}} })
        console.log(JSON.stringify(res, null, 4))

    } catch (error) {
        console.error(error)
        return []
    }
}

// this will be the server component
const GeneralSettingsTab = async () => {
    console.log('GeneralSettingsTab')
    await getTemplates()

    return (
        <>
            <GeneralSetting />
        </>
    )
}

export default GeneralSettingsTab