import { Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chat = () => {

    const [chat, setChat] = useState([])
    console.log(chat)

    const getChat = async () => {
        const data = await axios.get("http://localhost:8000/chat");
        return data;
    }

    useEffect(() => {
        getChat().then((res) => {
            setChat(res.data)
        })
    }, [])

    return (
        <div>
            <Heading>Chat Page</Heading>
        </div>
    )
}

export default Chat
