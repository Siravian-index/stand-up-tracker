import { getTemplates } from "@/db/query"
import GeneralSetting from "./GeneralSettings"
import ErrorMessage from "@/app/home/components/ErrorMessage"


interface Props {
    tuple: Awaited<ReturnType<typeof getTemplates>>
}

const GeneralSettingsTab = ({ tuple }: Props) => {
    const [error, templates] = tuple

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