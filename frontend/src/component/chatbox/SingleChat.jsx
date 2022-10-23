import { ArrowBackIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { getSender, getSenderDetails } from '../../config/chatLogic'
import { chatContext } from '../../context/ChatContext'
import ProfileModel from '../ProfileModel'
import UpdateGroupChatModal from './UpdateGroupModal'

const SingleChat = ({ refresh, setRefresh }) => {



    const { user, selectedChat, setSelectedChat } = useContext(chatContext)

    if (user && selectedChat) {
        var UserInfo = getSenderDetails(user, selectedChat.users)
    }

    console.log(UserInfo, "abc")
    return (
        <>
            {selectedChat ? <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >

                    {/* <IconButton mr={5}
                        d={{ base: "flex", md: "none" }}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                    /> */}
                    {!selectedChat.isGroupchat ? (<>
                        {getSender(user, selectedChat.users)}

                        <ProfileModel user={UserInfo.name} email={UserInfo.email} pic={UserInfo.pic} title={<ViewIcon />} />
                    </>) : (
                        <>{selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatModal />
                        </>
                    )
                    }

                </Text>
                <Box
                    d="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="90%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                </Box>
            </> : <Flex alignItems="center" justify="center" h="100%" pb={3}  >
                Click on a user to start chatting
            </Flex>}
        </>
    )
}

export default SingleChat
