
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
                <Countdown time={template?.Timebox?.time ?? 90} />
                <p>dynamic</p>
                <Title>{template?.name}</Title>
                <Link href=".">Go back</Link>
                <ParticipantList participants={template?.Participant || []}/>
                {/* <code>{JSON.stringify(template, null, 4)}</code> */}
            </Flex>
        </>

    )
}

export default DynamicDashboardPage