
import { Flex } from "@mantine/core";
import Link from "next/link";

interface Params {
    id: string
}

interface Props {
    params: Params
}

const DynamicDashboardPage = ({ params }: Props) => {


    return (
        <>
            <Flex
                gap="sm"
                justify="center"
                align="center"
                direction="column"
            >
                <p>dynamic</p>

                <code>{JSON.stringify(params, null, 2)}</code>
                <Link href=".">Go back</Link>
            </Flex>
        </>

    )
}

export default DynamicDashboardPage