import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { getSender } from '../config/chatLogic'
import { chatContext } from '../context/ChatContext'
import ChatLoading from './ChatLoading'
import GroupChatModal from './GroupChatModal'

const MyChat = ({refresh}) => {

    const { user, selectedChat, chats, setChats, setSelectedChat } = useContext(chatContext)


    const getChat = async () => {
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get("http://localhost:8000/chat", config);
            setChats(data)

        } catch (er) {
            console.log(er.message)
        }

    }
    useEffect(() => {
        getChat()
    }, [refresh])


    return (
        <div>
            <Box
                d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDir="column"
                alignItems="center"
                p={3}
                bg="white"
                w={{ base: "100%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Flex
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    fontFamily="Work sans"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={20}
                >
                    <Text>My Chats</Text>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        <GroupChatModal />
                    </Button>
                </Flex>
                <Box
                    d="flex"
                    flexDir="column"
                    p={3}
                    bg="#F8F8F8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {chats ? <Stack overflow="scroll">
                        {
                            chats.map((chat) =>
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        {!chat.isGroupchat
                                            ? getSender(user, chat.users)
                                            : chat.chatName}
                                    </Text>

                                </Box>)
                        }
                    </Stack> : <ChatLoading />}

                </Box>
            </Box>
        </div>
    )
}

export default MyChat
