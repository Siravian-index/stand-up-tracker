import prisma from "@/db/prismaClient"
import { useServerSession } from "@/lib/auth"
import Template from "./Template"
import { TemplateType, templateListSchema } from "@/schema/template"


const getTemplates = async (): Promise<TemplateType[]> => {
    try {
        const session = await useServerSession()
        const email = session?.user?.email
        if (!email) {
            throw new Error("Email not found in session obj");
        }
        const settings = await prisma.settings.findUnique({ where: { userEmail: email }, include: { Template: {} } })
        console.log(JSON.stringify(settings, null, 2))
        const templates = templateListSchema.parse(settings?.Template)
        return templates
    } catch (error) {
        console.error("Failed getting templates at getTemplates: ", error)
        return []
    }
}

const TemplateList = async () => {
    const templates = await getTemplates()

    if (!Boolean(templates.length)) {
        return (
            <div>
                <p>No templates to show yet</p>
            </div>
        )
    }

    return (
        <div>
            {templates.map((t) => (
                <Template template={t} />
            ))}
        </div>
    )
}

export default TemplateList