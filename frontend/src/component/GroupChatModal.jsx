import React, { useContext, useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Image,
    Center,
    Input,
    useToast,
    Spinner,
} from '@chakra-ui/react'
import { chatContext } from '../context/ChatContext';
import axios from 'axios';
import UserListItem from './UserListItem';
import UserBadge from './UserBadge';

const GroupChatModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = useContext(chatContext)

    const handleSearch = async (query) => {
        setSearch(query);

        if (!query) {
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
            console.log(searchResult)
        } catch (er) {
            console.log(er)
        }

    }

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post("http://localhost:8000/chat/group", {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((user) => user._id)),
            },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New Group Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (er) {
            console.log(er.message)
        }
    };


    const handleGroup = (user) => {
        if (selectedUsers.includes(user)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        setSelectedUsers([...selectedUsers, user])
    }

    const handleDelete = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id))
    }

    return (
        <div>
            <Text onClick={onOpen}>Create Group</Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight="bold" fontSize="30px" textAlign="center">Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Input placeholder='Chat Name' onChange={(e) => setGroupChatName(e.target.value)} />
                        </Center>
                        <Center my={5}>
                            <Input placeholder='Add users eg: gautam, rockey' onChange={(e) => handleSearch(e.target.value)} />
                        </Center>
                        {selectedUsers?.map((user) => <UserBadge key={user._id} user={user} handleFunction={() => handleDelete(user)} />)}

                        {loading ? <Spinner /> : (
                            searchResult?.slice(0, 5).map((user) => <UserListItem key={user._id} user={user} handleChatFunction={() => handleGroup(user)} />)
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme='blue' mr={3} >
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default GroupChatModal
