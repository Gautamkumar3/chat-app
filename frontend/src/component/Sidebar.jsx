import { BellIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { chatContext } from '../context/ChatContext';
import ChatLoading from './ChatLoading';
import ProfileModel from './ProfileModel';
import UserListItem from './UserListItem';

const Sidebar = () => {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const { user, chats, setChats, setSelectedChat } = useContext(chatContext)
    const navigate = useNavigate()
    const toast = useToast()

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/")
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.get(`http://localhost:8000/user?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });

            setLoading(false);
            setSearchResult(data);
            console.log(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId) => {
        console.log(userId)
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post("http://localhost:8000/chat", { userId }, config);

            if (!chats.find((chat) => chat._id === data._id)) {
                setChats([data, ...chats])
            }

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (er) {
            toast({
                title: "Error",
                description: er.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }


    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100vw"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}>
                        <Search2Icon />
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search Users
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Gk Chat
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>

                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <ProfileModel user={user.name} email={user.email} pic={user.pic} />
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Flex>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Search Users</DrawerHeader>
                    <DrawerBody>
                        <InputGroup>
                            <Input onChange={(e) => setSearch(e.target.value)} placeholder='search user by name or email' />
                            <InputRightElement children={<Search2Icon onClick={handleSearch} />} />
                        </InputGroup>
                        <Box mt={3}>
                            {loading ? <ChatLoading /> :
                                (
                                    searchResult?.map((user) => <UserListItem key={user._id} user={user} handleChatFunction={() => accessChat(user._id)} />)
                                )
                            }
                        </Box>
                        {loadingChat && <Spinner ml="auto" d="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar
