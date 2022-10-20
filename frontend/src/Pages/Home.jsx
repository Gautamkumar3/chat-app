import { Box, Container, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import Login from '../component/Login'
import Signup from '../component/Signup'

const Home = () => {
    return (

        <Container maxW={"xl"} centerContent>
            <Flex justify={"center"} p={3} w="100%" m="40px 0 15px 0" borderRadius={"lg"} border="1px solid red" bg="white">
                <Heading fontWeight={"400"}>GK Chat</Heading>
            </Flex>
            <Box bg="white" w="100%" p={4} borderRadius="lg">
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab w={"50%"} >Login</Tab>
                        <Tab w={"50%"} >Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container >


    )
}

export default Home
