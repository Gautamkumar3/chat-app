import { Box, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatBox from '../component/chatbox/ChatBox'
import MyChat from '../component/MyChat'
import Sidebar from '../component/Sidebar'
import { chatContext } from '../context/ChatContext'

const Chat = () => {

    const { user } = useContext(chatContext);
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))

        if (!user) {
            navigate("/")
        }
    }, [])



    return (
        <div>
            <Sidebar />
            <Flex justifyContent="space-between" w="100vw" h="91.5vh" p="10px">
                {/* {user && <MyChat />}
                {user && (
                    <ChatBox/>
                )} */}
                <MyChat refresh={refresh} setRefresh={setRefresh} />
                <ChatBox />
            </Flex>
        </div>
    )
}

export default Chat
