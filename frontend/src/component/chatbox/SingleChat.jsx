import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { getSender } from '../../config/chatLogic'
import { chatContext } from '../../context/ChatContext'

const SingleChat = ({ refresh, setRefresh }) => {

    const { user, selectedChat, setSelectedChat } = useContext(chatContext)
    console.log(selectedChat)
    return (
        <>
            {selectedChat ? <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton
                        d={{ base: "flex", md: "none" }}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupchat ? (<>
                        {getSender(user, selectedChat.users)}
                    </>) : (
                        <>{selectedChat.chatName.toUpperCase}</>
                    )
                    }

                </Text>

            </> : <Flex alignItems="center" justify="center" h="100%" pb={3}  >
                Click on a user to start chatting
            </Flex>}
        </>
    )
}

export default SingleChat
