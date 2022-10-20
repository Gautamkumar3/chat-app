import { Box, Container, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
    return (

        <Container maxW={"xl"} centerContent>
            <Flex justify={"center"} p={3} w="100%" m="40px 0 15px 0" borderRadius={"lg"} border="1px solid red" bg="white">
                <Heading fontWeight={"400"}>GK Chat</Heading>
            </Flex>
            <Box bg="white" w="100%" p={4} borderRadius="lg">
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Tab 1</Tab>
                    <Tab>Tab 2</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
        </Container >


    )
}

export default Home
