import { getTemplates } from "@/db/query"
import GeneralSetting from "./GeneralSettings"
import ErrorMessage from "@/app/home/components/ErrorMessage"



const GeneralSettingsTab = async () => {
    const [error, templates] = await getTemplates()

    if (error) {
        return <ErrorMessage error={error} />
    }

    return (
        <>
            <GeneralSetting templates={templates ?? []} />
        </>
    )
}

export default GeneralSettingsTab