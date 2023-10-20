import ErrorMessage from "@/app/home/components/ErrorMessage"
import Template from "./Template"
import { getTemplates } from "@/db/query"



const TemplateList = async () => {
    const [_, templates] = await getTemplates()
    const hasContent = Array.isArray(templates) && Boolean(templates.length)

    if (!hasContent) {
        return (
            <div>
                <p>No templates to show yet</p>
            </div>
        )
    }

    return (
        <div>
            {hasContent && templates.map((t) => (
                <Template template={t} key={t.id} />
            ))}
        </div>
    )
}

export default TemplateList