import { getTemplates } from "@/db/query"
import GeneralSetting from "./GeneralSettings"
import ErrorMessage from "@/app/home/components/ErrorMessage"



const GeneralSettingsTab = async () => {
    const [_error, templates] = await getTemplates()

    const resource = templates ?? []
    return (
        <>
            <GeneralSetting templates={resource} />
        </>
    )
}

export default GeneralSettingsTab