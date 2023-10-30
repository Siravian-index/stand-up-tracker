
import { Flex, Title } from "@mantine/core";
import Countdown from "./components/Countdown"

interface Props {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {

    return (
        <>
            <Flex
                gap="sm"
                justify="center"
                align="center"
                direction="column"
            >
                <p>DashboardLayout </p>
                <Title>Daily Stand-up</Title >

            </Flex>
            <Countdown />
            {children}
        </>
    )
}

export default DashboardLayout