import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from '../Pages/Chat'
import Home from '../Pages/Home'



const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    )
}

export default AllRoutes
