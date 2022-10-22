import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { chatContext } from '../../context/ChatContext'
import SingleChat from './SingleChat'

const ChatBox = ({ refresh, setRefresh }) => {

    const { selectedChat } = useContext(chatContext)

    return (
        <Box d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            bg="white"
            p={3}
            w={{ base: "100%", md: "65%" }}
        >
            <SingleChat refresh={refresh} setRefresh={setRefresh} />
        </Box>

    )
}

export default ChatBox
