import prisma from "@/db/prismaClient"
import GeneralSetting from "./GeneralSettings"
import { useServerSession } from "@/lib/auth"
import { TemplateType, templateListSchema } from "@/schema/template"



// this will be the server component
const GeneralSettingsTab = async () => {
    console.log('GeneralSettingsTab')
    // await getTemplates()

    return (
        <>
            <GeneralSetting />
        </>
    )
}

export default GeneralSettingsTab