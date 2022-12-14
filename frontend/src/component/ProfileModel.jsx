import React from 'react'
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
} from '@chakra-ui/react'

const ProfileModel = ({ user, email, pic,title="My Profile" }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Text onClick={onOpen}>{title}</Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="30px" textAlign="center">{user}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Image src={pic} w="100px" borderRadius="50%" />
                        </Center>
                        <Center>
                            <Text fontWeight="bold" mt={5}>Email : {email}</Text>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ProfileModel
