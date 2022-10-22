import { createContext, useEffect, useState } from "react";

export const chatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([])

    const user = JSON.parse(localStorage.getItem("userInfo"))

    return (
        <chatContext.Provider value={{ user, selectedChat, chats, setChats, setSelectedChat }}>
            {children}
        </chatContext.Provider>
    )

}

export default ChatContextProvider;