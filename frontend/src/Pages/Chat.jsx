import { Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyChat from '../component/MyChat'
import Sidebar from '../component/Sidebar'
import { chatContext } from '../context/ChatContext'

const Chat = () => {

    const [chat, setChat] = useState([])
    const { user } = useContext(chatContext);


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
            <MyChat/>
        </div>
    )
}

export default Chat
