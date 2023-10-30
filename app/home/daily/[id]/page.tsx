
import { getTemplateById } from "@/db/query";
import { Flex, Title } from "@mantine/core";
import Link from "next/link";
import ParticipantList from "../components/participants/ParticipantList";
import ErrorMessage from "../../components/ErrorMessage";
import Countdown from "../components/Countdown";

interface Params {
    id: string
}

interface Props {
    params: Params
}

const DynamicDashboardPage = async ({ params }: Props) => {
    const [error, template] = await getTemplateById(params.id)

    if (error) {
        return <ErrorMessage error={error}/>
    }

    return (
        <>
            <Flex
                gap="sm"
                justify="center"
                align="center"
                direction="column"
            >
                <Countdown />
                <p>dynamic</p>
                <Title>{template?.name}</Title>
                <Link href=".">Go back</Link>
                <code>{JSON.stringify(params, null, 2)}</code>
                <code>{JSON.stringify(template, null, 2)}</code>
                {/* <ParticipantList  participants={template?.Participant ?? []}/> */}
            </Flex>
        </>

    )
}

export default DynamicDashboardPage