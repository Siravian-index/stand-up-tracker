
import { Flex, Title } from "@mantine/core";

interface Props {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {

    return (
        <>
            <Flex
                mt="md"
                gap="sm"
                justify="center"
                align="center"
                direction="column"
            >
                <Title>Daily Stand-up</Title >
            </Flex>
            {children}
        </>
    )
}

export default DashboardLayout